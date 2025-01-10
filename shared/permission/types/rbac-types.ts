import { Permission } from "./permission-types";

/**
 * Standard RBAC role types following the principle of least privilege
 * - SUPER_ADMIN: Complete system access, can manage other admins
 * - ADMIN: Administrative access, can manage users and roles
 * - POWER_USER: Enhanced access, can manage resources but not system settings
 * - STANDARD: Basic access with standard permissions
 * - RESTRICTED: Limited access with specific restrictions
 * - CUSTOM: User-defined role with custom permissions
 */
export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  POWER_USER = 'POWER_USER',
  STANDARD = 'STANDARD',
  RESTRICTED = 'RESTRICTED',
  CUSTOM = 'CUSTOM',
}

/**
 * Role hierarchy levels for inheritance
 * Higher numbers have more permissions
 */
export const ROLE_HIERARCHY = {
  [RoleType.SUPER_ADMIN]: 50,
  [RoleType.ADMIN]: 40,
  [RoleType.POWER_USER]: 30,
  [RoleType.STANDARD]: 20,
  [RoleType.RESTRICTED]: 10,
  [RoleType.CUSTOM]: 0  // Custom roles don't participate in hierarchy by default
} as const;

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  description?: string;
  isSystem?: boolean;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon?: string;
  superAdminOnly?: boolean;
  adminOnly?: boolean;
  powerUserOnly?: boolean;
  standardAccess?: boolean;
  restrictedAccess?: boolean;
  customAccess?: boolean;
}

export interface AccessControl {
  /**
   * Check if the role has access to a specific resource and action
   * Takes into account role hierarchy and inheritance
   */
  hasAccess: (resource: string, action: string) => boolean;
  
  /**
   * Check if the role has a higher or equal hierarchy level
   */
  hasHigherOrEqualRole: (targetRole: Role) => boolean;
}

export interface RoleAssignment {
  userId: string;
  roleId: string;
  assignedAt: string;
  // Optional expiry for temporary role assignments
  expiresAt?: string;
}

export interface RBACConfig {
  storageKey: string;
  persistState: boolean;
  defaultRole: RoleType;
  customRoles?: boolean;
  auditEnabled?: boolean;
  // Enable role hierarchy and inheritance
  useHierarchy?: boolean;
  // Allow temporary role assignments
  temporaryRoles?: boolean;
}

export type { Permission } from "./permission-types";
