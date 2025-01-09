import { User } from '@/shared/auth/types';
import { LucideIcon } from 'lucide-react';

// Core feature IDs that map to our slices
export type FeatureId = 
  | 'dashboard'
  | 'profile'
  | 'roles'
  | 'audit'
  | 'security'
  | 'config'
  | 'team'
  | 'teams'
  | 'tasks'
  | 'metrics'
  | 'tools'
  | 'users'
  | 'settings'
  | 'projects'
  | 'project-analytics'
  | 'project-active'
  | 'project-archived'
  | 'project-locations'
  | 'analytics'
  | 'reports'
  | 'help'
  | 'support';

// Base navigation item type
export interface NavItem {
  id: FeatureId | string;
  label: string;
  path: string;
  icon?: LucideIcon;
  iconName?: string;
  disabled?: boolean;
  external?: boolean;
}

// Menu item extends NavItem with additional properties
export interface MenuItem extends NavItem {
  roles?: string[];
  children?: MenuItem[];
  permission?: string;
}

export interface NavigationSection {
  title: string;
  items: MenuItem[];
}

export interface NavigationState {
  expanded: boolean;
  items: MenuItem[];
  currentPath: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface NavigationConfig {
  defaultExpanded: boolean;
  persistState: boolean;
  allowMultipleExpanded?: boolean;
}

export interface NavigationItemProps {
  item: MenuItem;
  className?: string;
}

// Page registry types
export interface PageRegistryItem {
  id: FeatureId;
  component: () => Promise<{ default: React.ComponentType }>;
  default: React.ComponentType;
  enabled: boolean;
}

export type PageRegistry = Record<FeatureId, PageRegistryItem>;

export interface NavigationStore {
  activeRole: string;
  pathname?: string;
  setActiveRole: (role: string) => void;
  getMenuForRole: () => NavigationSection[];
  canAccessRoute: (path: string) => boolean;
}

// Navigation settings type
export interface NavigationSettings {
  expanded: boolean;
  activeRole: string;
  sections: NavigationSection[];
}

// Re-export the User type from auth
export type { User } from '@/shared/auth/types';