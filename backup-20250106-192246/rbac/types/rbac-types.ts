export enum RoleType {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  CLIENT = "CLIENT",
  CUSTOM = "CUSTOM"
}

export enum PermissionAction {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}

export enum Permission {
  DASHBOARD_READ = "dashboard:read",
  DASHBOARD_WRITE = "dashboard:write",
  USERS_READ = "users:read",
  USERS_WRITE = "users:write",
  SETTINGS_READ = "settings:read",
  SETTINGS_WRITE = "settings:write",
  PROJECTS_READ = "projects:read",
  PROJECTS_WRITE = "projects:write",
  TEAMS_READ = "teams:read",
  TEAMS_WRITE = "teams:write"
}

export interface PermissionDescriptor {
  resource: string;
  action: PermissionAction;
}

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  description: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface AccessControl {
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: RoleType) => boolean;
}

export interface RoleAssignment {
  userId: string;
  roleId: string;
  assignedAt: string;
}

export interface RBACConfig {
  storageKey: string;
  persistState: boolean;
  defaultRole: RoleType;
}
