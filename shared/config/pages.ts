import { Role } from 'shared/auth/types';
import * as pages from '@/slices';

interface PageConfig {
  path: string;
  roles: Role[];
  component: React.ComponentType;
}

export const PAGES_CONFIG: PageConfig[] = [
  {
    path: '/audit',
    roles: ['administrator'],
    component: pages.AuditPage,
  },
  {
    path: '/budget',
    roles: ['administrator', 'manager'],
    component: pages.BudgetPage,
  },
  {
    path: '/collaboration',
    roles: ['administrator', 'manager', 'staff'],
    component: pages.CollaborationPage,
  },
  {
    path: '/config',
    roles: ['administrator'],
    component: pages.ConfigPage,
  },
  {
    path: '/department',
    roles: ['administrator', 'manager'],
    component: pages.DepartmentPage,
  },
  {
    path: '/documents',
    roles: ['administrator', 'manager', 'staff'],
    component: pages.DocumentsPage,
  },
  {
    path: '/emergency',
    roles: ['administrator'],
    component: pages.EmergencyPage,
  },
  {
    path: '/features',
    roles: ['guest'],
    component: pages.FeaturesPage,
  },
  {
    path: '/knowledge',
    roles: ['administrator', 'manager', 'staff', 'guest'],
    component: pages.KnowledgePage,
  },
  {
    path: '/metrics',
    roles: ['administrator', 'manager'],
    component: pages.MetricsPage,
  },
  {
    path: '/navigation',
    roles: ['administrator'],
    component: pages.NavigationPage,
  },
  {
    path: '/resources',
    roles: ['administrator', 'manager', 'staff', 'guest'],
    component: pages.ResourcesPage,
  },
  {
    path: '/security',
    roles: ['administrator'],
    component: pages.SecurityPage,
  },
  {
    path: '/support',
    roles: ['administrator', 'manager', 'staff', 'guest'],
    component: pages.SupportPage,
  },
  {
    path: '/tasks',
    roles: ['administrator', 'manager', 'staff'],
    component: pages.TasksPage,
  },
  {
    path: '/team',
    roles: ['administrator', 'manager'],
    component: pages.TeamPage,
  },
  {
    path: '/time',
    roles: ['administrator', 'manager', 'staff'],
    component: pages.TimePage,
  },
  {
    path: '/tools',
    roles: ['administrator', 'manager', 'staff'],
    component: pages.ToolsPage,
  },
  {
    path: '/users',
    roles: ['administrator'],
    component: pages.UsersPage,
  },
];