import { Role, RoleType, ROLE_HIERARCHY } from '@/shared/permission/types/rbac-types';
import { PermissionAction, createPermission } from '@/shared/permission/types/permission-types';
import { NAVIGATION_PERMISSIONS } from '@/shared/navigation/constants/permissions';

// Helper to create a role with common fields
const createRoleTemplate = (
  id: string,
  name: string,
  description: string,
  type: RoleType,
  isSystem: boolean = false,
  restrictions: string[] = [],
  parentRole?: string,
  hierarchyLevel?: number
): Role => ({
  id,
  name,
  description,
  type,
  isSystem,
  createdAt: new Date(),
  updatedAt: new Date(),
  restrictions: restrictions.map(featureId => 
    createPermission(featureId, PermissionAction.READ)
  ),
  parentRole,
  hierarchyLevel: hierarchyLevel ?? ROLE_HIERARCHY[type]
});

// Define permission sets for different access levels
export const SYSTEM_RESTRICTED_AREAS = [
  NAVIGATION_PERMISSIONS.ROLES,
  NAVIGATION_PERMISSIONS.AUDIT,
  NAVIGATION_PERMISSIONS.SECURITY
];

export const BASIC_ACCESSIBLE_AREAS = [
  NAVIGATION_PERMISSIONS.DASHBOARD,
  NAVIGATION_PERMISSIONS.HELP,
  NAVIGATION_PERMISSIONS.SUPPORT,
  NAVIGATION_PERMISSIONS.PROFILE
];

// Super Admin - complete system access
export const SUPER_ADMIN_ROLE: Role = createRoleTemplate(
  'super-admin',
  'Super Administrator',
  'Complete system access with ability to manage other admins',
  RoleType.SUPER_ADMIN,
  true,
  [] // No restrictions
);

// Admin - administrative access
export const ADMIN_ROLE: Role = createRoleTemplate(
  'admin',
  'Administrator',
  'Administrative access to manage users and roles',
  RoleType.ADMIN,
  true,
  [], // No restrictions
  SUPER_ADMIN_ROLE.id
);

// Power User - enhanced access
export const POWER_USER_ROLE: Role = createRoleTemplate(
  'power-user',
  'Power User',
  'Enhanced access with ability to manage resources',
  RoleType.POWER_USER,
  true,
  [
    NAVIGATION_PERMISSIONS.SECURITY // Cannot access security settings
  ],
  ADMIN_ROLE.id
);

// Standard User - basic access
export const STANDARD_ROLE: Role = createRoleTemplate(
  'standard',
  'Standard User',
  'Regular access with standard permissions',
  RoleType.STANDARD,
  true,
  SYSTEM_RESTRICTED_AREAS,
  POWER_USER_ROLE.id
);

// Restricted User - limited access
export const RESTRICTED_ROLE: Role = createRoleTemplate(
  'restricted',
  'Restricted User',
  'Limited access to basic features only',
  RoleType.RESTRICTED,
  true,
  // Restrict everything except basic accessible areas
  Object.values(NAVIGATION_PERMISSIONS)
    .filter(featureId => !BASIC_ACCESSIBLE_AREAS.includes(featureId)),
  STANDARD_ROLE.id
);

// Example of creating a custom role with inheritance:
/*
export const TEAM_LEAD_ROLE = createRoleTemplate(
  'team-lead',
  'Team Lead',
  'Custom role for team leaders',
  RoleType.CUSTOM,
  false,
  [NAVIGATION_PERMISSIONS.SECURITY],
  POWER_USER_ROLE.id,  // Inherits from power user
  35  // Custom hierarchy level between POWER_USER and ADMIN
);
*/
