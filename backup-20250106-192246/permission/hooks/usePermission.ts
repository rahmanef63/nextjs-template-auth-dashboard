import { useSession } from 'next-auth/react';
import { Permission } from '../types';
import { hasPermission as checkPermission } from '../lib';

export const usePermission = (requiredPermission: Permission): boolean => {
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];

  return checkPermission(userPermissions, requiredPermission);
};
