export type Permission = 
  | 'users:read'
  | 'users:write'
  | 'dashboard:read'
  | 'dashboard:write'
  | 'settings:read'
  | 'settings:write';

export type Role = 'ADMIN' | 'STAFF' | 'MANAGER' | 'USER';

export interface RolePermissions {
  [key: string]: Permission[];
}

export interface AccessControl {
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
}