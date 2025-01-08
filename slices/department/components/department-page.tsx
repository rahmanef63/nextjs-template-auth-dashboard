'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { LayoutDashboard } from 'lucide-react';
import { DepartmentOverview } from './department-overview';
import { TeamPerformanceView } from './team-performance';
import { ResourceAllocation } from './resource-allocation';

export function DepartmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Department Dashboard"
        description="Overview of department activities and metrics"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DepartmentOverview />
        <TeamPerformanceView />
        <ResourceAllocation />
      </div>
    </div>
  );
}