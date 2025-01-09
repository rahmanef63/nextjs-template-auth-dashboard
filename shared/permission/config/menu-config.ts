import { Permission } from '../types/permission-types';
import { RoleType } from 'shared/types';
import { MenuItem } from 'shared/navigation/types';
import { LucideIcon, LayoutDashboard, User, Users, Settings, FileText, CreditCard } from 'lucide-react';

// Map of icon names to Lucide components
export const ICON_MAP: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  user: User,
  users: Users,
  settings: Settings,
  audit: FileText,
  billing: CreditCard,
};

// Function to fetch menu structure from server
export async function fetchMenuStructure(): Promise<MenuItem[]> {
  const response = await fetch('/api/rbac/menus');
  if (!response.ok) {
    throw new Error('Failed to fetch menu structure');
  }
  const menuItems = await response.json();
  return addIconComponents(menuItems);
}

// Function to fetch role-specific menu items
export async function fetchRoleMenus(role: RoleType): Promise<MenuItem[]> {
  const response = await fetch(`/api/rbac/menus/role/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch role menus');
  }
  const menuItems = await response.json();
  return addIconComponents(menuItems);
}

// Function to check if a menu item is accessible
export async function isMenuItemAccessible(
  menuId: string,
  role: RoleType
): Promise<boolean> {
  const response = await fetch(`/api/rbac/menus/access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menuId, role })
  });
  if (!response.ok) {
    throw new Error('Failed to check menu access');
  }
  return response.json();
}

// Function to add icon components to menu items
function addIconComponents(items: MenuItem[]): MenuItem[] {
  return items.map(item => ({
    ...item,
    icon: item.iconName ? ICON_MAP[item.iconName] : undefined,
    children: item.children ? addIconComponents(item.children) : undefined
  }));
}

// Function to filter menu items based on permissions
export async function filterMenusByPermissions(
  items: MenuItem[],
  role: RoleType
): Promise<MenuItem[]> {
  const accessibleItems: MenuItem[] = [];
  
  for (const item of items) {
    const hasAccess = await isMenuItemAccessible(item.id, role);
    if (hasAccess) {
      const filteredItem = { ...item };
      if (item.children?.length) {
        filteredItem.children = await filterMenusByPermissions(item.children, role);
      }
      accessibleItems.push(filteredItem);
    }
  }
  
  return addIconComponents(accessibleItems);
}
