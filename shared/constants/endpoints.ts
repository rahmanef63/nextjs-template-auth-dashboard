export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/signin',
    register: '/api/auth/register',
    logout: '/api/auth/signout',
    session: '/api/auth/session',
    providers: '/api/auth/providers',
  },
  users: {
    me: '/api/users/me',
    list: '/api/users',
    detail: (id: string) => `/api/users/${id}`,
  },
} as const;