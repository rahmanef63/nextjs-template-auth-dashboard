'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Users } from 'lucide-react';

export function CollaborationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Users}
        title="Team Collaboration"
        description="Collaborate with team members"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Communicate with team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shared Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access team resources and documents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}