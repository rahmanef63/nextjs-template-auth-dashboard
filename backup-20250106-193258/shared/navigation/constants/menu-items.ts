import {
  Users,
  Settings,
  LayoutDashboard,
  ClipboardList,
  Shield,
  Activity,
  FileText,
  Package,
  BarChart3,
  Clock,
  BookOpen,
  Wrench,
  UsersRound,
  MessageSquare,
  Briefcase,
  FolderOpen,
  HelpCircle,
  Cog
} from 'lucide-react';
import { MenuItem } from '../types';
import { Permission } from '../../rbac/types';

// Core menu items available to all authenticated users
export const CORE_MENU_ITEMS: MenuItem[] = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    permission: Permission.DASHBOARD_READ
  },
  { 
    id: 'profile',
    icon: Users,
    label: 'Profile',
    path: '/dashboard/profile',
    permission: Permission.USERS_READ
  }
];

// Administrative menu items
export const ADMIN_MENU_ITEMS: MenuItem[] = [
  { 
    id: 'teams',
    icon: UsersRound,
    label: 'Teams',
    path: '/dashboard/teams',
    permission: Permission.TEAMS_READ
  },
  { 
    id: 'projects',
    icon: Briefcase,
    label: 'Projects',
    path: '/dashboard/project',
    permission: Permission.PROJECTS_READ
  },
  { 
    id: 'roles',
    icon: Shield,
    label: 'Role Management',
    path: '/dashboard/roles',
    permission: Permission.USERS_WRITE
  }
];

// Manager menu items
export const MANAGER_MENU_ITEMS: MenuItem[] = [
  { 
    id: 'team',
    icon: UsersRound,
    label: 'Team',
    path: '/dashboard/team',
    permission: Permission.USERS_READ
  },
  { 
    id: 'tasks',
    icon: FileText,
    label: 'Tasks',
    path: '/dashboard/tasks',
    permission: Permission.DASHBOARD_WRITE
  },
  { 
    id: 'metrics',
    icon: BarChart3,
    label: 'Metrics',
    path: '/dashboard/metrics',
    permission: Permission.DASHBOARD_READ
  },
  { 
    id: 'tools',
    icon: Wrench,
    label: 'Tools',
    path: '/dashboard/tools',
    permission: Permission.DASHBOARD_WRITE
  }
];

// Export combined menu items
export const MENU_ITEMS = [...CORE_MENU_ITEMS, ...ADMIN_MENU_ITEMS];