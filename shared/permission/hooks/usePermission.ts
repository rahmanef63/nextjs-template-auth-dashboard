import { useCallback } from 'react';
import type { RoleType } from '../types';

export const usePermission = (userRole: RoleType) => {
  return useCallback(() => {
    // For now, just return true since we're focusing on UI/UX
    return true;
  }, [userRole]);
};
