export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  USER: 'USER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['*'],
  [ROLES.MANAGER]: [
    'dashboard:read',
    'dashboard:write',
    'users:read',
    'settings:read',
  ],
  [ROLES.STAFF]: [
    'dashboard:read',
    'settings:read',
  ],
  [ROLES.USER]: [
    'dashboard:read',
  ],
} as const;