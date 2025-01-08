import { AuditPage } from '@/slices/audit';
import { BudgetPage } from '@/slices/budget';
import { CollaborationPage } from '@/slices/collaboration';
import { ConfigPage } from '@/slices/config';
import { DepartmentPage } from '@/slices/department';
import { DocumentsPage } from '@/slices/documents';
import { EmergencyPage } from '@/slices/emergency';
import { FeaturesPage } from '@/slices/features';
import { KnowledgePage } from '@/slices/knowledge';
import { MetricsPage } from '@/slices/metrics';
import { NavigationPage } from '@/slices/navigation';
import { ResourcesPage } from '@/slices/resources';
import { RolesPage } from '@/slices/roles';
import { SecurityPage } from '@/slices/security';
import { SupportPage } from '@/slices/support';
import { TasksPage } from '@/slices/tasks';
import { TeamPage } from '@/slices/team';
import { TimePage } from '@/slices/time';
import { ToolsPage } from '@/slices/tools';
import { ProfilePage } from '@/slices/profile';
import { UserManagementPage } from '@/slices/users';

export const PAGE_COMPONENTS = {
  audit: AuditPage,
  roles: RolesPage,
  budget: BudgetPage,
  collaboration: CollaborationPage,
  config: ConfigPage,
  department: DepartmentPage,
  documents: DocumentsPage,
  emergency: EmergencyPage,
  features: FeaturesPage,
  knowledge: KnowledgePage,
  metrics: MetricsPage,
  navigation: NavigationPage,
  resources: ResourcesPage,
  security: SecurityPage,
  support: SupportPage,
  tasks: TasksPage,
  team: TeamPage,
  time: TimePage,
  tools: ToolsPage,
  profile: ProfilePage,
  users: UserManagementPage,
} as const;