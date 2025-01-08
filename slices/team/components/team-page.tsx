'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { UserCog } from 'lucide-react';

export function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={UserCog}
        title="Team Management"
        description="Manage team members and assignments"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage team composition</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage team tasks and responsibilities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}