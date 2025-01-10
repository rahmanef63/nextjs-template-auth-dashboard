import { RoleType } from '@/shared/permission/types/rbac-types';

const DEFAULT_PERMISSIONS: Record<RoleType, string[]> = {
  [RoleType.SUPER_ADMIN]: [
    'all:*',
  ],
  [RoleType.ADMIN]: [
    'users:*',
    'roles:read',
    'roles:write',
    'settings:*',
    'reports:*',
    'analytics:*',
  ],
  [RoleType.POWER_USER]: [
    'users:read',
    'users:write',
    'reports:*',
    'analytics:read',
    'projects:*',
    'tasks:*',
  ],
  [RoleType.STANDARD]: [
    'users:read',
    'reports:read',
    'analytics:read',
    'tasks:read',
    'tasks:write',
  ],
  [RoleType.RESTRICTED]: [
    'users:read',
    'reports:read',
    'tasks:read',
  ],
  [RoleType.CUSTOM]: [],
};

export const getPermissionsForRole = (roleType: RoleType): string[] => {
  return DEFAULT_PERMISSIONS[roleType] || [];
};

export const hasPermission = (userRole: RoleType, requiredPermission: string): boolean => {
  const userPermissions = DEFAULT_PERMISSIONS[userRole];
  
  if (!userPermissions) {
    return false;
  }

  // Super admin has all permissions
  if (userRole === RoleType.SUPER_ADMIN) {
    return true;
  }

  return userPermissions.some(permission => {
    // Check for wildcard permissions
    if (permission.endsWith(':*')) {
      const resource = permission.split(':')[0];
      const requiredResource = requiredPermission.split(':')[0];
      return resource === requiredResource;
    }
    return permission === requiredPermission;
  });
};