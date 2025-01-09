import { RoleType } from '@/shared/permission/types';
import * as pages from '@/slices';

interface PageConfig {
  path: string;
  roles: RoleType[];
  component: React.ComponentType;
}

export const PAGES_CONFIG: PageConfig[] = [
  {
    path: '/audit',
    roles: [RoleType.ADMIN],
    component: pages.AuditPage,
  },
  {
    path: '/budget',
    roles: [RoleType.ADMIN, RoleType.MANAGER],
    component: pages.BudgetPage,
  },
  {
    path: '/config',
    roles: [RoleType.ADMIN],
    component: pages.ConfigPage,
  },
  {
    path: '/dashboard',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF, RoleType.CLIENT],
    component: pages.DashboardPage,
  },
  {
    path: '/department',
    roles: [RoleType.ADMIN, RoleType.MANAGER],
    component: pages.DepartmentPage,
  },
  {
    path: '/documents',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF],
    component: pages.DocumentsPage,
  },
  {
    path: '/emergency',
    roles: [RoleType.ADMIN],
    component: pages.EmergencyPage,
  },
  {
    path: '/features',
    roles: [RoleType.CLIENT],
    component: pages.FeaturesPage,
  },
  {
    path: '/knowledge',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF, RoleType.CLIENT],
    component: pages.KnowledgePage,
  },
  {
    path: '/metrics',
    roles: [RoleType.ADMIN, RoleType.MANAGER],
    component: pages.MetricsPage,
  },
  {
    path: '/navigation',
    roles: [RoleType.ADMIN],
    component: pages.NavigationPage,
  },
  {
    path: '/profile',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF, RoleType.CLIENT],
    component: pages.ProfilePage,
  },
  {
    path: '/resources',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF, RoleType.CLIENT],
    component: pages.ResourcesPage,
  },
  {
    path: '/roles',
    roles: [RoleType.ADMIN],
    component: pages.RolesPage,
  },
  {
    path: '/support',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF, RoleType.CLIENT],
    component: pages.SupportPage,
  },
  {
    path: '/tasks',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF],
    component: pages.TasksPage,
  },
  {
    path: '/time',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF],
    component: pages.TimePage,
  },
  {
    path: '/tools',
    roles: [RoleType.ADMIN, RoleType.MANAGER, RoleType.STAFF],
    component: pages.ToolsPage,
  },
  {
    path: '/users',
    roles: [RoleType.ADMIN],
    component: pages.UserManagementPage,
  },
];