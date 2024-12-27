export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout',
  },
  dashboard: {
    root: '/dashboard',
    profile: '/dashboard/profile',
    settings: '/dashboard/settings',
  },
  admin: {
    root: '/admin',
    users: '/admin/users',
    reports: '/admin/reports',
    settings: '/admin/settings',
  },
  manager: {
    root: '/manager',
    staff: '/manager/staff',
    reports: '/manager/reports',
    clients: '/manager/clients',
  },
  staff: {
    root: '/staff',
    clients: '/staff/clients',
    reports: '/staff/reports',
  },
  client: {
    root: '/client',
    reports: '/client/reports',
    profile: '/client/profile',
  },
  api: {
    auth: '/api/auth',
    users: '/api/users',
    reports: '/api/reports',
  },
} as const;