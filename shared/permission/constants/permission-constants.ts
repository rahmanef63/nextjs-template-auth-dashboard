import { ROLES } from 'shared/auth/constants';
import { Role, RoleType } from 'shared/types';
import { Permission, PERMISSIONS } from '../types/permission-types';


export const PERMISSION_LEVELS = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  ADMIN: 3,
} as const;

export const DEFAULT_ROLE = ROLES.GUEST;

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: PERMISSION_LEVELS.ADMIN,
  [ROLES.MANAGER]: PERMISSION_LEVELS.WRITE,
  [ROLES.STAFF]: PERMISSION_LEVELS.WRITE,
  [ROLES.CLIENT]: PERMISSION_LEVELS.READ,
  [ROLES.GUEST]: PERMISSION_LEVELS.READ,
} as const;


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
