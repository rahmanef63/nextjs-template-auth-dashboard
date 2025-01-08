'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Activity } from 'lucide-react';
import { ActivityLog } from './activity-log';
import { UserActions } from './user-actions';

export function AuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Activity}
        title="Audit System"
        description="Monitor and review system activities"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityLog />
        <UserActions />
      </div>
    </div>
  );
}