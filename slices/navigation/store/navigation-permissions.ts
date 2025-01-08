import { create } from 'zustand';
import { Permission } from 'shared/permission/types/rbac-types';
import { FeatureId } from 'shared/navigation/types';
import { NAVIGATION_PERMISSIONS } from 'shared/navigation/constants/permissions';
import { NavigationPermissionState } from '../types';

// Initialize with default read permissions for all features
const initialPermissions = Object.values(NAVIGATION_PERMISSIONS).reduce((acc, featureId) => ({
  ...acc,
  [featureId]: Permission.READ
}), {} as Record<FeatureId, Permission>);

export const useNavigationPermissions = create<NavigationPermissionState>((set) => ({
  permissions: initialPermissions,
  isLoading: false,
  error: null,
  updatePermissions: (permissions: Record<FeatureId, Permission>) => set({ permissions }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error })
}));
