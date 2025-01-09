export const PERMISSION_CONFIG = {
  DASHBOARD: {
    READ: 'dashboard:read',
    WRITE: 'dashboard:write'
  },
  USERS: {
    READ: 'users:read',
    WRITE: 'users:write'
  },
  SETTINGS: {
    READ: 'settings:read',
    WRITE: 'settings:write'
  },
  TEAMS: {
    READ: 'teams:read',
    WRITE: 'teams:write'
  },
  PROJECTS: {
    READ: 'projects:read',
    WRITE: 'projects:write'
  }
} as const;
