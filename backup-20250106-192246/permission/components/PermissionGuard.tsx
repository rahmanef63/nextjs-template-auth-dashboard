import { ReactNode } from 'react';
import { usePermission } from '../hooks';
import { Permission } from '../types';

interface PermissionGuardProps {
  permission: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGuard = ({
  permission,
  fallback = null,
  children
}: PermissionGuardProps) => {
  const hasPermission = usePermission(permission);

  if (!hasPermission) {
    return fallback;
  }

  return <>{children}</>;
};
