import { create } from 'zustand';
import { Permission, PermissionAction, createPermission } from '@/shared/permission/types/permission-types';
import { FeatureId } from '@/shared/navigation/types';
import { NAVIGATION_PERMISSIONS } from '@/shared/navigation/constants/permissions';
import { NavigationPermissionState } from '../types';
import { Role, RoleType } from '@/shared/permission/types/rbac-types';

// Initialize with READ permission for all features
const initialPermissions = Object.values(NAVIGATION_PERMISSIONS).reduce((acc, featureId) => ({
  ...acc,
  [featureId]: createPermission(featureId, PermissionAction.READ)
}), {} as Record<FeatureId, Permission>);

export const useNavigationPermissions = create<NavigationPermissionState>((set) => ({
  permissions: initialPermissions,
  isLoading: false,
  error: null,
  
  // Update permissions based on role
  updatePermissions: (role: Role) => {
    // Admin has access to everything
    if (role.type === RoleType.ADMIN) {
      set({ permissions: initialPermissions });
      return;
    }

    // For other roles, check restrictions
    const permissions = Object.values(NAVIGATION_PERMISSIONS).reduce((acc, featureId) => {
      const hasAccess = !role.restrictions?.includes(
        createPermission(featureId, PermissionAction.READ)
      );

      return {
        ...acc,
        [featureId]: hasAccess ? createPermission(featureId, PermissionAction.READ) : null
      };
    }, {} as Record<FeatureId, Permission | null>);

    set({ permissions: permissions as Record<FeatureId, Permission> });
  },
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error })
}));
