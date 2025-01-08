import { FeatureId } from 'shared/navigation/types';
import { Permission } from 'shared/permission/types/rbac-types';

export interface NavigationPermission {
  featureId: FeatureId;
  permission: Permission;
}

export interface NavigationPermissionState {
  permissions: Record<FeatureId, Permission>;
  isLoading: boolean;
  error: string | null;
  updatePermissions: (permissions: Record<FeatureId, Permission>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
