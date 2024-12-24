'use client';

import { useAuth } from './useAuth';
import { Permission, Role } from 'shared/lib/rbac/types';
import { rolePermissions } from 'shared/lib/rbac/permissions';

export function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = (permission: Permission): boolean => {
    if (!user?.role) return false;
    return rolePermissions[user.role].includes(permission);
  };

  const hasRole = (role: Role): boolean => {
    return user?.role === role;
  };

  return {
    hasPermission,
    hasRole
  };
}