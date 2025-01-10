import { Activity, List, UserCog } from 'lucide-react';
import { SliceNavigation } from '../types';
import { AUDIT_ROUTES } from './types';
import { MenuSectionKey } from '@/shared/navigation/constants/menu-section';

export const auditNavigation: SliceNavigation = {
  id: 'audit',
  title: 'Audit',
  href: AUDIT_ROUTES.ROOT,
  icon: Activity,
  menuSection: MenuSectionKey.MANAGEMENT,
  items: [
    {
      title: 'Activity Log',
      href: AUDIT_ROUTES.ACTIVITY_LOG,
      icon: List
    },
    {
      title: 'User Actions',
      href: AUDIT_ROUTES.USER_ACTIONS,
      icon: UserCog
    }
  ]
};

// Export slice configuration
export const auditConfig = {
  id: 'audit',
  title: 'Audit',
  basePath: AUDIT_ROUTES.ROOT,
  navigation: auditNavigation,
  routes: AUDIT_ROUTES,
  menuSection: MenuSectionKey.MANAGEMENT
};