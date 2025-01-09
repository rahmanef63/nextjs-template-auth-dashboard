import { 
  RoleType,
  RBACConfig,
  Permission
 } from 'shared/types';

export interface MenuConfig {
  id: string;
  path: string;
  roles: RoleType[];
  permissions: Permission[];
  children?: MenuConfig[];
}

export interface RoleConfig {
  type: RoleType;
  permissions: Permission[];
  menus: string[];
  allowCustom?: boolean;
}

// Default configuration that can be overridden by server
export const DEFAULT_RBAC_CONFIG: RBACConfig = {
  storageKey: 'app:rbac',
  persistState: true,
  defaultRole: RoleType.CLIENT,
  customRoles: false,
  auditEnabled: true
};

// Function to fetch RBAC configuration from server
export async function fetchRBACConfig(): Promise<{
  config: RBACConfig;
  roles: RoleConfig[];
  menus: MenuConfig[];
}> {
  const response = await fetch('/api/rbac/config');
  if (!response.ok) {
    throw new Error('Failed to fetch RBAC configuration');
  }
  return response.json();
}

// Function to get menus for a role, considering inherited permissions
export async function getMenusForRole(role: RoleType): Promise<MenuConfig[]> {
  const response = await fetch(`/api/rbac/menus/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch role menus');
  }
  return response.json();
}

// Function to get permissions for a role
export async function getPermissionsForRole(role: RoleType): Promise<Permission[]> {
  const response = await fetch(`/api/rbac/permissions/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch role permissions');
  }
  return response.json();
}

// Function to check if a menu is accessible
export async function checkMenuAccess(menuId: string, role: RoleType): Promise<boolean> {
  const response = await fetch(`/api/rbac/access/menu/${menuId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  });
  if (!response.ok) {
    throw new Error('Failed to check menu access');
  }
  return response.json();
}

// Function to check multiple permissions at once
export async function checkPermissions(
  permissions: Permission[],
  role: RoleType
): Promise<Record<Permission, boolean>> {
  const response = await fetch('/api/rbac/permissions/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ permissions, role })
  });
  if (!response.ok) {
    throw new Error('Failed to check permissions');
  }
  return response.json();
}

// Function to get default menus for a role
export async function getDefaultMenus(role: RoleType): Promise<string[]> {
  const menus = await getMenusForRole(role);
  return menus.map(menu => menu.id);
}