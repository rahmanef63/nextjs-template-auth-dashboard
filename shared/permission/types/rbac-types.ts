import { Permission } from "./permission-types";

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
  customRoles?: boolean;
  auditEnabled?: boolean;
}

export type { Permission } from "./permission-types";
