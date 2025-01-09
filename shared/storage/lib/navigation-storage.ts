import { Role } from 'shared/types';
import { MenuItem } from 'shared/navigation/types';
import { getDefaultMenus } from 'shared/permission/config/rbac-config';

const MENU_STORAGE_KEY = 'rbac_menu_settings';
const NAVIGATION_STORAGE_KEY = 'rbac_navigation_settings';

interface MenuSettings {
  [roleType: string]: string[];
}

interface NavigationSettings {
  [roleType: string]: MenuItem[];
}

const defaultNavigation: MenuItem[] = [];

// Get menu items for a specific role
export async function getRoleMenus(role: Role): Promise<string[]> {
  try {
    const storedSettings = localStorage.getItem(MENU_STORAGE_KEY);
    if (!storedSettings) {
      return await getDefaultMenus(role.type);
    }

    const settings = JSON.parse(storedSettings) as MenuSettings;
    const roleType = role.type.toString();
    const storedMenus = settings[roleType];
    if (!storedMenus) {
      return await getDefaultMenus(role.type);
    }
    return Array.isArray(storedMenus) ? storedMenus : [];
  } catch (error) {
    console.error('Error reading menu settings:', error);
    return await getDefaultMenus(role.type);
  }
}

// Set menu items for a specific role
export async function setRoleMenus(role: Role, menuIds: string[]): Promise<void> {
  try {
    const storedSettings = localStorage.getItem(MENU_STORAGE_KEY);
    const settings: MenuSettings = storedSettings ? JSON.parse(storedSettings) : {};
    const roleType = role.type.toString();
    settings[roleType] = Array.isArray(menuIds) ? menuIds : await getDefaultMenus(role.type);
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving menu settings:', error);
  }
}

// Get navigation items for a specific role
export async function getNavigationByRole(role: Role): Promise<MenuItem[]> {
  try {
    const storedSettings = localStorage.getItem(NAVIGATION_STORAGE_KEY);
    if (!storedSettings) {
      return defaultNavigation;
    }

    const settings = JSON.parse(storedSettings) as NavigationSettings;
    const roleType = role.type.toString();
    return settings[roleType] || defaultNavigation;
  } catch (error) {
    console.error('Error reading navigation settings:', error);
    return defaultNavigation;
  }
}

// Set navigation items for a specific role
export async function setNavigationForRole(role: Role, items: MenuItem[]): Promise<void> {
  try {
    const storedSettings = localStorage.getItem(NAVIGATION_STORAGE_KEY);
    const settings = storedSettings ? JSON.parse(storedSettings) as NavigationSettings : {};
    const roleType = role.type.toString();

    localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify({
      ...settings,
      [roleType]: items
    }));
  } catch (error) {
    console.error('Error saving navigation settings:', error);
  }
}

// Clear navigation items for a specific role
export async function clearNavigationForRole(role: Role): Promise<void> {
  try {
    const storedSettings = localStorage.getItem(NAVIGATION_STORAGE_KEY);
    if (!storedSettings) return;

    const settings = JSON.parse(storedSettings) as NavigationSettings;
    const roleType = role.type.toString();
    
    if (settings[roleType]) {
      delete settings[roleType];
      localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(settings));
    }
  } catch (error) {
    console.error('Error clearing navigation settings:', error);
  }
}

// Get filtered menu items based on role and allowed menu IDs
export async function getFilteredMenuItems(items: MenuItem[], role: Role): Promise<MenuItem[]> {
  const allowedMenuIds = await getRoleMenus(role);
  return items.filter(item => allowedMenuIds.includes(item.id));
}

// Reset menu items for a specific role to defaults
export async function resetRoleMenus(role: Role): Promise<void> {
  try {
    const storedSettings = localStorage.getItem(MENU_STORAGE_KEY);
    const settings = storedSettings ? JSON.parse(storedSettings) as MenuSettings : {};
    const roleType = role.type.toString();

    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify({
      ...settings,
      [roleType]: await getDefaultMenus(role.type)
    }));
  } catch (error) {
    console.error('Error resetting menu settings:', error);
  }
}