import { FeatureId } from '@/shared/navigation/types/navigation-types';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  details: Record<string, unknown>;
}

export interface UserAction {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'failure';
}

export const AUDIT_FEATURE_ID: FeatureId = 'audit';

// Define route constants
export const AUDIT_ROUTES = {
  ROOT: '/dashboard/audit',
  ACTIVITY_LOG: '/dashboard/audit/activity-log',
  USER_ACTIONS: '/dashboard/audit/user-actions'
} as const;