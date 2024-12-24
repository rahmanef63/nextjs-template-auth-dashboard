export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  users: {
    me: '/users/me',
    list: '/users',
  },
} as const;