'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function MetricsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={BarChart3}
        title="Performance Metrics"
        description="Track and analyze performance indicators"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Key performance indicators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Detailed performance analytics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Generate performance reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}