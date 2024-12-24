export const AUTH_ENDPOINTS = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refresh: '/api/auth/refresh',
  verify: '/api/auth/verify',
  resetPassword: '/api/auth/reset-password',
  forgotPassword: '/api/auth/forgot-password',
} as const;