import { useCallback } from 'react';
import { Permission } from '../types/permission-types';
import { useUser } from '@/shared/hooks/use-user';
import { hasPermission } from '../lib/permission-utils';

export const usePermission = (requiredPermission: Permission) => {
  const { user } = useUser();

  return useCallback(() => {
    if (!user || !user.role) {
      return false;
    }

    return hasPermission(user.role, requiredPermission);
  }, [user, requiredPermission]);
};
