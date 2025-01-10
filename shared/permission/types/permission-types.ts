// Basic CRUD actions that apply to any resource
export enum PermissionAction {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}

// Resource types
export enum PermissionResource {
  ALL = 'all',
  USERS = 'users',
  ROLES = 'roles',
  SETTINGS = 'settings'
}

// Permission format: "resource:action"
export type PermissionString = `${string}:${PermissionAction}`;

// Database Permission model
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define common permissions
export const PERMISSIONS = {
  ALL: {
    READ: 'all:read' as PermissionString,
    CREATE: 'all:create' as PermissionString,
    UPDATE: 'all:update' as PermissionString,
    DELETE: 'all:delete' as PermissionString,
    MANAGE: 'all:manage' as PermissionString
  },
  USERS: {
    READ: 'users:read' as PermissionString,
    CREATE: 'users:create' as PermissionString,
    UPDATE: 'users:update' as PermissionString,
    DELETE: 'users:delete' as PermissionString,
    MANAGE: 'users:manage' as PermissionString
  },
  ROLES: {
    READ: 'roles:read' as PermissionString,
    CREATE: 'roles:create' as PermissionString,
    UPDATE: 'roles:update' as PermissionString,
    DELETE: 'roles:delete' as PermissionString,
    MANAGE: 'roles:manage' as PermissionString
  },
  SETTINGS: {
    READ: 'settings:read' as PermissionString,
    UPDATE: 'settings:update' as PermissionString,
    MANAGE: 'settings:manage' as PermissionString
  }
} as const;

// Helper to create a permission string
export const createPermission = (resource: string, action: PermissionAction): PermissionString => {
  return `${resource}:${action}` as PermissionString;
};

// Helper to parse a permission string
export const parsePermission = (permission: PermissionString): { resource: string; action: PermissionAction } => {
  const [resource, action] = permission.split(':') as [string, PermissionAction];
  return { resource, action };
};
