export enum RoleType {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  CLIENT = "CLIENT",
  CUSTOM = "CUSTOM"
}

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  description: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  permissions?: Permission[];
}

export enum Permission {
  CREATE = "create",
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  OWN = "own",
  PUBLIC = "public"
}

export interface AccessControl {
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
