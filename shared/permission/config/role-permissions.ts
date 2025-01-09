import { Permission, PERMISSIONS } from '../types/permission-types';
import { RoleType } from '../types';

export const ROLE_PERMISSIONS: Record<RoleType, Permission[]> = {
  ADMIN: Object.values(PERMISSIONS).flatMap(group => Object.values(group)),
  MANAGER: [
    PERMISSIONS.DASHBOARD.READ,
    PERMISSIONS.DASHBOARD.WRITE,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.TEAMS.MANAGE,
    PERMISSIONS.PROJECTS.MANAGE
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
  ],
  CUSTOM: []
} as const;