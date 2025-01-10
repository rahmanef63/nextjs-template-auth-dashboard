import { FeatureId } from '../types/navigation-types';

// List of all feature IDs that require permissions
export const NAVIGATION_PERMISSIONS: Record<string, FeatureId> = {
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  ROLES: 'roles',
  AUDIT: 'audit',
  SECURITY: 'security',
  CONFIG: 'config',
  TEAM: 'team',
  TEAMS: 'teams',
  TASKS: 'tasks',
  METRICS: 'metrics',
  TOOLS: 'tools',
  USERS: 'users',
  SETTINGS: 'settings',
  PROJECTS: 'projects',
  PROJECT_ANALYTICS: 'project-analytics',
  PROJECT_ACTIVE: 'project-active',
  PROJECT_ARCHIVED: 'project-archived',
  PROJECT_LOCATIONS: 'project-locations',
  ANALYTICS: 'analytics',
  REPORTS: 'reports',
  HELP: 'help',
  SUPPORT: 'support'
} as const;
