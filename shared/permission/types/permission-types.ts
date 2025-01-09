export enum PermissionAction {
  READ = 'read',
  WRITE = 'write',
  MANAGE = 'manage',
  DELETE = 'delete',
  CREATE = 'create'
}

export enum PermissionResource {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  SETTINGS = 'settings',
  TEAMS = 'teams',
  PROJECTS = 'projects',
  BILLING = 'billing',
  ROLES = 'roles',
  AUDIT = 'audit',
  ANALYTICS = 'analytics'
}

export type Permission = `${PermissionResource}:${PermissionAction}`;

export const PERMISSIONS = {
  DASHBOARD: {
    READ: `${PermissionResource.DASHBOARD}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.DASHBOARD}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.DASHBOARD}:${PermissionAction.MANAGE}` as Permission
  },
  USERS: {
    READ: `${PermissionResource.USERS}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.USERS}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.USERS}:${PermissionAction.MANAGE}` as Permission,
    DELETE: `${PermissionResource.USERS}:${PermissionAction.DELETE}` as Permission,
    CREATE: `${PermissionResource.USERS}:${PermissionAction.CREATE}` as Permission
  },
  SETTINGS: {
    READ: `${PermissionResource.SETTINGS}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.SETTINGS}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.SETTINGS}:${PermissionAction.MANAGE}` as Permission
  },
  TEAMS: {
    READ: `${PermissionResource.TEAMS}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.TEAMS}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.TEAMS}:${PermissionAction.MANAGE}` as Permission,
    DELETE: `${PermissionResource.TEAMS}:${PermissionAction.DELETE}` as Permission,
    CREATE: `${PermissionResource.TEAMS}:${PermissionAction.CREATE}` as Permission
  },
  PROJECTS: {
    READ: `${PermissionResource.PROJECTS}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.PROJECTS}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.PROJECTS}:${PermissionAction.MANAGE}` as Permission
  },
  BILLING: {
    READ: `${PermissionResource.BILLING}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.BILLING}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.BILLING}:${PermissionAction.MANAGE}` as Permission
  },
  ROLES: {
    READ: `${PermissionResource.ROLES}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.ROLES}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.ROLES}:${PermissionAction.MANAGE}` as Permission,
    DELETE: `${PermissionResource.ROLES}:${PermissionAction.DELETE}` as Permission,
    CREATE: `${PermissionResource.ROLES}:${PermissionAction.CREATE}` as Permission
  },
  AUDIT: {
    READ: `${PermissionResource.AUDIT}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.AUDIT}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.AUDIT}:${PermissionAction.MANAGE}` as Permission
  },
  ANALYTICS: {
    READ: `${PermissionResource.ANALYTICS}:${PermissionAction.READ}` as Permission,
    WRITE: `${PermissionResource.ANALYTICS}:${PermissionAction.WRITE}` as Permission,
    MANAGE: `${PermissionResource.ANALYTICS}:${PermissionAction.MANAGE}` as Permission
  }
} as const;
