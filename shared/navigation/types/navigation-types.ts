import { RoleType } from '@/shared/permission/types/rbac-types';
import { TypeIcon as type, LucideIcon } from 'lucide-react'

// Core feature IDs that map to our slices
export type FeatureId = string;

export type showIcon = {
  icon: boolean
}

export interface NavMainSubItem {
  id?: string
  title: string
  href?: string
  icon?: LucideIcon
  isVisible?: boolean
}

export interface NavMainItem {
  id?: FeatureId | string;
  title: string
  href?: string 
  icon?: LucideIcon
  isActive?: boolean
  isCollapsed?: boolean
  items?: NavMainSubItem[]
  showIcon?: boolean // Controls parent icon visibility when collapsed
}


export interface NavProjectItem {
  name: string
  href?: string
  icon?: LucideIcon
}



// Menu item extends NavItem
export interface MenuItem extends NavMainItem  {
  superAdminOnly?: boolean;
  adminOnly?: boolean;
  powerUserOnly?: boolean;
  standardAccess?: boolean;
  restrictedAccess?: boolean;
  customAccess?: boolean;
  isActive?: boolean;
  items?: MenuItem[];
  external?: boolean;
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
  sections: NavigationSection[];
  defaultPath: string;
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

export interface PageRegistry {
  [key: string]: PageRegistryItem;
}

export interface NavigationStore {
  activeRole: RoleType;
  pathname?: string;
  setActiveRole: (role: RoleType) => void;
  getMenuForRole: () => NavigationSection[];
  canAccessRoute: (path: string) => boolean;
}

// Navigation settings type
export interface NavigationSettings {
  expanded: boolean;
  activeRole: RoleType;
  sections: NavigationSection[];
}

// Re-export the User type from auth
export type { User } from '@/shared/auth/types';