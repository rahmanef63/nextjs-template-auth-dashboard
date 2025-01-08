import { Role, RoleType } from '../../types';
import { Permission } from 'shared/permission/types/rbac-types';

export const DEFAULT_PERMISSIONS = [
  Permission.CREATE,
  Permission.READ,
  Permission.WRITE,
  Permission.DELETE,
  Permission.OWN,
  Permission.PUBLIC
];

export const ADMINISTRATOR_ROLE: Role = {
  id: 'admin',
  name: 'administrator',
  description: 'System administrator with full access',
  type: RoleType.ADMIN,
  isSystem: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  permissions: DEFAULT_PERMISSIONS
};
