export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  POWER_USER: 'POWER_USER',
  STANDARD: 'STANDARD',
  RESTRICTED: 'RESTRICTED',
  CUSTOM: 'CUSTOM',
} as const;

export type RoleKey = keyof typeof ROLES;