export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  CLIENT: 'CLIENT',
  GUEST: 'GUEST',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];