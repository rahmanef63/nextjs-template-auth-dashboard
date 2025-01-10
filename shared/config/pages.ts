import { RoleType } from '@/shared/permission/types/rbac-types';

export const PAGES = {
  dashboard: {
    path: '/dashboard',
    title: 'Dashboard',
    description: 'View your dashboard',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD],
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    description: 'Manage your profile',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD, RoleType.RESTRICTED],
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    description: 'System settings',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN],
  },
  users: {
    path: '/users',
    title: 'Users',
    description: 'Manage users',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER],
  },
  roles: {
    path: '/roles',
    title: 'Roles',
    description: 'Manage roles',
    roles: [RoleType.SUPER_ADMIN],
  },
  reports: {
    path: '/reports',
    title: 'Reports',
    description: 'View reports',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD],
  },
  audit: {
    path: '/audit',
    title: 'Audit Log',
    description: 'View audit logs',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN],
  },
  help: {
    path: '/help',
    title: 'Help',
    description: 'Get help',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD, RoleType.RESTRICTED],
  },
  support: {
    path: '/support',
    title: 'Support',
    description: 'Get support',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD, RoleType.RESTRICTED],
  },
  analytics: {
    path: '/analytics',
    title: 'Analytics',
    description: 'View analytics',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER, RoleType.STANDARD],
  },
  projects: {
    path: '/projects',
    title: 'Projects',
    description: 'Manage projects',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER],
  },
  tasks: {
    path: '/tasks',
    title: 'Tasks',
    description: 'Manage tasks',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER],
  },
  teams: {
    path: '/teams',
    title: 'Teams',
    description: 'Manage teams',
    roles: [RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.POWER_USER],
  },
} as const;