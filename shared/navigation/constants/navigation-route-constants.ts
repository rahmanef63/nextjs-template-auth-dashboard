// Define route groups using enum for better type safety
export enum RouteGroup {
  DASHBOARD = 'dashboard',
  ADMIN = 'admin',
  AUTH = 'auth',
  PUBLIC = 'public'
}

// Helper function to create paths
export const createRoutePath = (group: RouteGroup, ...segments: string[]) => {
  return ['', group, ...segments].filter(Boolean).join('/');
};

// Base paths for different route groups
export const RoutePaths = {
  [RouteGroup.DASHBOARD]: createRoutePath(RouteGroup.DASHBOARD),
  [RouteGroup.ADMIN]: createRoutePath(RouteGroup.ADMIN),
  [RouteGroup.AUTH]: createRoutePath(RouteGroup.AUTH),
  [RouteGroup.PUBLIC]: createRoutePath(RouteGroup.PUBLIC)
} as const;

// Type for route configuration
export interface RouteConfig {
  path: string;
  children?: Record<string, string>;
}
