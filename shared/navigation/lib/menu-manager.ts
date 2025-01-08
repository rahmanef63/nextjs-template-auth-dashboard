import { MenuItem } from '../types';
import { defaultAdminMenuItems, defaultManagerMenuItems, defaultStaffMenuItems, defaultSupportMenuItems } from '../config/default-menu';

/**
 * Menu Manager Class
 * Handles the dynamic management of navigation menu items
 */
export class MenuManager {
  private static instance: MenuManager;
  private customMenuItems: Map<string, MenuItem[]>;

  private constructor() {
    this.customMenuItems = new Map();
    this.initializeDefaultMenus();
  }

  public static getInstance(): MenuManager {
    if (!MenuManager.instance) {
      MenuManager.instance = new MenuManager();
    }
    return MenuManager.instance;
  }

  private initializeDefaultMenus() {
    this.customMenuItems.set('admin', [...defaultAdminMenuItems]);
    this.customMenuItems.set('manager', [...defaultManagerMenuItems]);
    this.customMenuItems.set('staff', [...defaultStaffMenuItems]);
    this.customMenuItems.set('support', [...defaultSupportMenuItems]);
  }

  /**
   * Get menu items for a specific role
   */
  public getMenuItems(role: string): MenuItem[] {
    return this.customMenuItems.get(role) || [];
  }

  /**
   * Add a new menu item to a role
   */
  public addMenuItem(role: string, item: MenuItem): void {
    const items = this.customMenuItems.get(role) || [];
    if (!items.find(existing => existing.id === item.id)) {
      items.push(item);
      this.customMenuItems.set(role, items);
    }
  }

  /**
   * Update an existing menu item
   */
  public updateMenuItem(role: string, itemId: string, updates: Partial<MenuItem>): boolean {
    const items = this.customMenuItems.get(role);
    if (!items) return false;

    const index = items.findIndex(item => item.id === itemId);
    if (index === -1) return false;

    items[index] = { ...items[index], ...updates };
    this.customMenuItems.set(role, items);
    return true;
  }

  /**
   * Remove a menu item
   */
  public removeMenuItem(role: string, itemId: string): boolean {
    const items = this.customMenuItems.get(role);
    if (!items) return false;

    const filtered = items.filter(item => item.id !== itemId);
    if (filtered.length === items.length) return false;

    this.customMenuItems.set(role, filtered);
    return true;
  }

  /**
   * Reset menu items for a role to defaults
   */
  public resetToDefault(role: string): void {
    switch (role) {
      case 'admin':
        this.customMenuItems.set('admin', [...defaultAdminMenuItems]);
        break;
      case 'manager':
        this.customMenuItems.set('manager', [...defaultManagerMenuItems]);
        break;
      case 'staff':
        this.customMenuItems.set('staff', [...defaultStaffMenuItems]);
        break;
      case 'support':
        this.customMenuItems.set('support', [...defaultSupportMenuItems]);
        break;
    }
  }

  /**
   * Reset all menus to their defaults
   */
  public resetAllToDefault(): void {
    this.initializeDefaultMenus();
  }
}

// Export a singleton instance
export const menuManager = MenuManager.getInstance();
