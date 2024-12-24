export const PERMISSIONS = {
  users: {
    read: 'users:read',
    write: 'users:write',
    delete: 'users:delete',
  },
  dashboard: {
    read: 'dashboard:read',
    write: 'dashboard:write',
  },
  settings: {
    read: 'settings:read',
    write: 'settings:write',
  },
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS][keyof typeof PERMISSIONS[keyof typeof PERMISSIONS]];