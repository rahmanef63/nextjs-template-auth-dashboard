export const ROUTES = {
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
  dashboard: {
    root: '/dashboard',
    profile: '/dashboard/profile',
    users: '/dashboard/users',
    settings: '/dashboard/settings',
  },
  api: {
    auth: '/api/auth',
    users: '/api/users',
    notifications: '/api/notifications',
    dashboard: '/api/dashboard',
  },
} as const;