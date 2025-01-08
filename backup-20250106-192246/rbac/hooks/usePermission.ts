import { Permission } from '../types';
import { useRBACStore } from '../lib/rbac-store';

export const usePermission = (permission: Permission) => {
  const hasPermission = useRBACStore((state: any) => state.hasPermission);
  return hasPermission(permission);
};
