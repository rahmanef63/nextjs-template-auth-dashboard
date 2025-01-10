import { FeatureId } from '@/shared/navigation/types';
import { Permission } from '@/shared/permission/types/permission-types';
import { Role } from '@/shared/permission/types/rbac-types';

export interface NavigationPermission {
  featureId: FeatureId;
  permission: Permission;
}

export interface NavigationPermissionState {
  permissions: Record<FeatureId, Permission>;
  isLoading: boolean;
  error: string | null;
  updatePermissions: (role: Role) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
