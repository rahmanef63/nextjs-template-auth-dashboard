import { 
  RoleType,
  RBACConfig,
} from 'shared/permission/types/rbac-types';
import { Permission } from '../types/permission-types';

export interface MenuConfig {
  id: string;
  path: string;
  roles: RoleType[];
  permissions: string[];
  children?: MenuConfig[];
}

export interface RoleConfig {
  type: RoleType;
  permissions: string[];
  menus: string[];
  allowCustom?: boolean;
}

// Default configuration that can be overridden by server
export const DEFAULT_RBAC_CONFIG: RBACConfig = {
  storageKey: 'app:rbac',
  persistState: true,
  defaultRole: RoleType.RESTRICTED,
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

// Function to get menus for a role
export async function getMenusForRole(role: RoleType): Promise<MenuConfig[]> {
  const response = await fetch(`/api/rbac/menus/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch role menus');
  }
  return response.json();
}

// Function to check if a menu is accessible
export async function checkMenuAccess(menuId: string, role: RoleType): Promise<boolean> {
  const response = await fetch(`/api/rbac/access/${menuId}/${role}`);
  if (!response.ok) {
    throw new Error('Failed to check menu access');
  }
  const { hasAccess } = await response.json();
  return hasAccess;
}

// Function to check multiple permissions at once
export async function checkPermissions(
  permissions: string[],
  role: RoleType
): Promise<Record<string, boolean>> {
  const response = await fetch('/api/rbac/permissions/check', {
    method: 'POST',
    body: JSON.stringify({ permissions, role })
  });
  if (!response.ok) {
    throw new Error('Failed to check permissions');
  }
  return response.json();
}

// Function to get default menus for a role
export async function getDefaultMenus(role: RoleType): Promise<string[]> {
  const response = await fetch(`/api/rbac/menus/default/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch default menus');
  }
  return response.json();
}