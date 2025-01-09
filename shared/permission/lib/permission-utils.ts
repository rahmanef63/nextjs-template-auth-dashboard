import { PERMISSIONS, Permission } from '../types/permission-types';
import { RoleType } from '../types/rbac-types';

export const rolePermissions: Record<RoleType, Permission[]> = {
  [RoleType.ADMIN]: Object.values(PERMISSIONS).flatMap(group => Object.values(group)),
  [RoleType.MANAGER]: [
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.WRITE,
    PERMISSIONS.TEAMS.MANAGE,
  ],
  [RoleType.STAFF]: [
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.WRITE,
  ],
  [RoleType.CLIENT]: [
    PERMISSIONS.USERS.READ,
  ],
  [RoleType.CUSTOM]: [
    PERMISSIONS.USERS.READ,
  ],
};

export const hasPermission = (userRole: RoleType, requiredPermission: Permission): boolean => {
  return rolePermissions[userRole]?.includes(requiredPermission) ?? false;
};

export const hasAnyPermission = (userRole: RoleType, requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole: RoleType, requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => hasPermission(userRole, permission));
};