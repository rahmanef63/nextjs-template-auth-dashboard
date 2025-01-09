import {
  Cog, Shield, Users, Activity, AlertTriangle,
  LayoutDashboard, UserCog, Package, BarChart3,
  DollarSign, Kanban, FileText, Wrench, Clock,
  BookOpen, HelpCircle, LifeBuoy, Lock, Settings
} from 'lucide-react';
import { MenuItem } from '../types/navigation-types';

// Core administrative menu items
export const adminMenuItems: MenuItem[] = [
  { 
    id: 'config', 
    icon: Cog, 
    label: 'Global Config', 
    path: '/dashboard/config' 
  },
  { 
    id: 'security', 
    icon: Shield, 
    label: 'Security Settings', 
    path: '/dashboard/security' 
  },
  { 
    id: 'users', 
    icon: Users, 
    label: 'User Management', 
    path: '/dashboard/users' 
  },
  { 
    id: 'roles', 
    icon: Shield, 
    label: 'Role Management', 
    path: '/dashboard/roles' 
  },
  { 
    id: 'audit', 
    icon: Activity, 
    label: 'Audit System', 
    path: '/dashboard/audit' 
  },
  { 
    id: 'emergency', 
    icon: AlertTriangle, 
    label: 'Emergency Controls', 
    path: '/dashboard/emergency' 
  },
  { 
    id: 'navigation', 
    icon: Settings, 
    label: 'Navigation Settings', 
    path: '/dashboard/navigation' 
  },
];

// Management menu items
export const managementMenuItems: MenuItem[] = [
  { 
    id: 'department', 
    icon: LayoutDashboard, 
    label: 'Department Dashboard', 
    path: '/dashboard/department' 
  },
  { 
    id: 'team', 
    icon: UserCog, 
    label: 'Team Management', 
    path: '/dashboard/team' 
  },
  { 
    id: 'resources', 
    icon: Package, 
    label: 'Resource Control', 
    path: '/dashboard/resources' 
  },
  { 
    id: 'metrics', 
    icon: BarChart3, 
    label: 'Performance Metrics', 
    path: '/dashboard/metrics' 
  },
  { 
    id: 'budget', 
    icon: DollarSign, 
    label: 'Budget Management', 
    path: '/dashboard/budget' 
  },
];

// Staff menu items
export const staffMenuItems: MenuItem[] = [
  { 
    id: 'tasks', 
    icon: Kanban, 
    label: 'Task Board', 
    path: '/dashboard/tasks' },
  { 
    id: 'collaboration', 
    icon: Users, 
    label: 'Team Collaboration', 
    path: '/dashboard/collaboration' 
  },
  { 
    id: 'documents', 
    icon: FileText, 
    label: 'Document Management', 
    path: '/dashboard/documents' },
  { 
    id: 'tools', 
    icon: Wrench, 
    label: 'Project Tools', 
    path: '/dashboard/tools' 
  },
  { 
    id: 'time', 
    icon: Clock, 
    label: 'Time Management', 
    path: '/dashboard/time' 
  },
];

// Guest menu items
export const guestMenuItems: MenuItem[] = [
  { 
    id: 'knowledge', 
    icon: BookOpen, 
    label: 'Knowledge Base', 
    path: '/dashboard/knowledge' 
  },
  { 
    id: 'support', 
    icon: LifeBuoy, 
    label: 'Support Access', 
    path: '/dashboard/support' 
  },
  { 
    id: 'features', 
    icon: Lock, 
    label: 'Limited Features', 
    path: '/dashboard/features' 
  },
];

// Default menu items that are always shown
export const defaultMenuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: '/dashboard' 
  },
  { 
    id: 'profile', 
    icon: UserCog, 
    label: 'Profile', 
    path: '/dashboard/profile' 
  },
];

export const MENU_ITEMS: MenuItem[] = [
  ...defaultMenuItems,
  ...adminMenuItems,
  ...managementMenuItems,
  ...staffMenuItems,
  ...guestMenuItems,
];