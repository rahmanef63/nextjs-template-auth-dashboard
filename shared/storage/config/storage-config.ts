export const STORAGE_KEYS = {
  SESSION: 'rbac_session',
  USERS: 'rbac_users',
  AUDIT_LOGS: 'rbac_audit_logs',
  SETTINGS: 'rbac_settings',
  ROLES: 'system_roles',
  ROLE_ASSIGNMENTS: 'role_assignments',
  ROLE_ACTIVITIES: 'role_activities',
  NAVIGATION_SETTINGS: 'navigation_settings',
} as const;

export const DEFAULT_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'AdminPass123!',
    role: 'administrator',
    permissions: ['*'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    password: 'ManagerPass123!',
    role: 'manager',
    permissions: ['read:all', 'write:own'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Staff User',
    email: 'staff@example.com',
    password: 'StaffPass123!',
    role: 'staff',
    permissions: ['read:own', 'write:own'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Client User',
    email: 'client@example.com',
    password: 'ClientPass123!',
    role: 'guest',
    permissions: ['read:public'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face',
  },
];

export const DEFAULT_NAVIGATION_SETTINGS = {
  administrator: ['config', 'security', 'users', 'roles', 'audit', 'emergency', 'navigation'],
  manager: ['department', 'team', 'resources', 'metrics', 'budget'],
  staff: ['tasks', 'collaboration', 'documents', 'tools', 'time'],
  guest: ['knowledge', 'support', 'features'],
};
