import { PERMISSIONS } from '../config/permissions';

export const ROLE_PERMISSIONS = {
  ADMIN: Object.values(PERMISSIONS).flatMap(group => Object.values(group)),
  MANAGER: [
    PERMISSIONS.DASHBOARD.READ,
    PERMISSIONS.DASHBOARD.WRITE,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.SETTINGS.READ,
    PERMISSIONS.TEAMS.READ,
    PERMISSIONS.TEAMS.WRITE,
    PERMISSIONS.PROJECTS.READ,
    PERMISSIONS.PROJECTS.WRITE
  ],
  STAFF: [
    PERMISSIONS.DASHBOARD.READ,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.TEAMS.READ,
    PERMISSIONS.PROJECTS.READ
  ],
  CLIENT: [
    PERMISSIONS.DASHBOARD.READ,
    PERMISSIONS.PROJECTS.READ
  ]
} as const;

