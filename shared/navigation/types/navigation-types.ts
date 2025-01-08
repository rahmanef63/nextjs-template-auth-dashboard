import { Role } from '@/shared/types';
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

export interface MenuItem {
  id: FeatureId | string;
  icon?: LucideIcon;
  label: string;
  path: string;
  children?: MenuItem[];
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
  storageKey: string;
}

export interface NavigationItemProps {
  item: MenuItem;
  className?: string;
}

// Page registry types
export interface PageRegistryItem {
  id: FeatureId;
  component: () => Promise<{ default: React.ComponentType }>;
  enabled: boolean;
}

export type PageRegistry = Record<FeatureId, PageRegistryItem>;



export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  label?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}



export interface UserNavItem {
  id: string
  title: string
  href?: string
  onClick?: () => void
}

export interface User {
  name?: string;
  email: string
  avatar?: string
  id: string;
  role: Role
  createdAt: Date;
  updatedAt: Date;
}