import { Role, RoleType } from 'shared/types';
import { Permission, PERMISSIONS } from '../types/permission-types';

export const ADMINISTRATOR_ROLE: Role = {
  id: 'admin',
  name: 'administrator',
  description: 'System administrator with full access',
  type: RoleType.ADMIN,
  permissions: [
    PERMISSIONS.USERS.CREATE,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.WRITE,
    PERMISSIONS.USERS.DELETE,
    PERMISSIONS.USERS.MANAGE
  ],
  isSystem: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_PERMISSIONS: Permission[] = [
  PERMISSIONS.USERS.READ,
  PERMISSIONS.USERS.WRITE,
  PERMISSIONS.USERS.MANAGE
];
