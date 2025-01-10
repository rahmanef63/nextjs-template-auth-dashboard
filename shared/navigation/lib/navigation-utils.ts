import { RoleType } from '@/shared/permission/types/rbac-types';
import { menuManager } from './menu-manager';

/**
 * Normalize path by removing /dashboard prefix and ensuring single leading slash
 */
function normalizePath(path: string): string {
  return '/' + path.replace(/^\/+|\/+$/g, '').replace('/dashboard/', '');
}

/**
 * Check if a route is valid for a given role
 */
export const isValidRoute = (path: string, role: RoleType): boolean => {
  // Super admin and admin can access all routes
  if (role === RoleType.SUPER_ADMIN || role === RoleType.ADMIN) {
    return true;
  }

  const normalizedPath = normalizePath(path);
  
  // For other roles, check if the route is in their menu items
  const menuItems = menuManager.getMenuItems(role);
  return menuItems.some(item => {
    const itemPath = normalizePath(item.href || '');
    return itemPath === normalizedPath;
  });
};

/**
 * Get the default route for a role
 */
export const getDefaultRoute = (role: RoleType): string => {
  switch (role) {
    case RoleType.SUPER_ADMIN:
    case RoleType.ADMIN:
      return '/dashboard/admin';
    case RoleType.POWER_USER:
      return '/dashboard/management';
    case RoleType.STANDARD:
      return '/dashboard/operational';
    case RoleType.RESTRICTED:
    case RoleType.CUSTOM:
      return '/dashboard';
    default:
      return '/dashboard';
  }
};
