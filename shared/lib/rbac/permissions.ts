import { RolePermissions } from './types';

export const rolePermissions: RolePermissions = {
  ADMIN: [
    'users:read',
    'users:write',
    'dashboard:read',
    'dashboard:write',
    'settings:read',
    'settings:write'
  ],
  MANAGER: [
    'users:read',
    'dashboard:read',
    'dashboard:write',
    'settings:read'
  ],
  STAFF: [
    'dashboard:read',
    'settings:read'
  ],
  USER: [
    'dashboard:read'
  ]
};