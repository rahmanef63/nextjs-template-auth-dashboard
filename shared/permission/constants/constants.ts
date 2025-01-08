import { Role, RoleType } from 'shared/types';
import { Permission } from '../types/rbac-types';

export const ADMINISTRATOR_ROLE: Role = {
  id: 'admin',
  name: 'administrator',
  description: 'System administrator with full access',
  type: RoleType.ADMIN,
  permissions: [
    Permission.CREATE,
    Permission.READ,
    Permission.WRITE,
    Permission.DELETE,
    Permission.OWN,
    Permission.PUBLIC
  ],
  isSystem: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_PERMISSIONS = [
  Permission.READ,
  Permission.WRITE,
  Permission.OWN,
  Permission.PUBLIC
];
