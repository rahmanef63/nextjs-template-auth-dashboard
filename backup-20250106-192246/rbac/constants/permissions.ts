import { Role, Permission, RoleType } from '../types';

export const DEFAULT_PERMISSIONS = [
  Permission.USERS_READ,
  Permission.DASHBOARD_READ,
  Permission.SETTINGS_READ
];

export const ADMINISTRATOR_ROLE: Role = {
  id: 'admin',
  name: 'administrator',
  type: 'ADMIN' as RoleType,
  description: 'System administrator with full access',
  permissions: DEFAULT_PERMISSIONS,
  isSystem: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};