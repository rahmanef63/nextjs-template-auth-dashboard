'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Clock } from 'lucide-react';

export function TimePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Clock}
        title="Time Management"
        description="Track and manage time effectively"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Log and monitor work hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your schedule</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}