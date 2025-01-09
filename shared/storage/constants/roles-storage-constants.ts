import { Role, RoleType } from '../../types';
import { Permission, PERMISSIONS } from 'shared/permission/types/permission-types';

export const DEFAULT_PERMISSIONS: Permission[] = [
  PERMISSIONS.USERS.CREATE,
  PERMISSIONS.USERS.READ,
  PERMISSIONS.USERS.WRITE,
  PERMISSIONS.USERS.DELETE,
  PERMISSIONS.USERS.MANAGE
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
