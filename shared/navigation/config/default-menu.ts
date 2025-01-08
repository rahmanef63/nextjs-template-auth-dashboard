import {
  Cog, Shield, Users, Activity, AlertTriangle,
  LayoutDashboard, UserCog, Package, BarChart3,
  DollarSign, Kanban, FileText, Wrench, Clock,
  BookOpen, HelpCircle, LifeBuoy, Lock, Settings
} from 'lucide-react';
import type { MenuItem } from '../types';

/**
 * Default menu items configuration
 * These items serve as the initial navigation structure
 * Can be overridden or extended through the navigation settings
 */

export const defaultAdminMenuItems: MenuItem[] = [
  { 
    id: 'config',
    icon: Cog,
    label: 'Global Config',
    path: '/dashboard/config',
    permission: 'settings:read'
  },
  {
    id: 'users',
    icon: Users,
    label: 'User Management',
    path: '/dashboard/users',
    permission: 'users:read'
  },
  {
    id: 'roles',
    icon: Shield,
    label: 'Roles & Permissions',
    path: '/dashboard/roles',
    permission: 'roles:read'
  }
];

export const defaultManagerMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    permission: 'dashboard:read'
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'Analytics',
    path: '/dashboard/analytics',
    permission: 'analytics:read'
  }
];

export const defaultStaffMenuItems: MenuItem[] = [
  {
    id: 'tasks',
    icon: Kanban,
    label: 'Tasks',
    path: '/dashboard/tasks',
    permission: 'tasks:read'
  },
  {
    id: 'reports',
    icon: FileText,
    label: 'Reports',
    path: '/dashboard/reports',
    permission: 'reports:read'
  }
];

export const defaultSupportMenuItems: MenuItem[] = [
  {
    id: 'help',
    icon: HelpCircle,
    label: 'Help Center',
    path: '/dashboard/help',
    permission: 'help:read'
  },
  {
    id: 'support',
    icon: LifeBuoy,
    label: 'Support',
    path: '/dashboard/support',
    permission: 'support:read'
  }
];
