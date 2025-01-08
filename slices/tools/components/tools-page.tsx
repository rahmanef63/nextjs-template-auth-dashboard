'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Wrench } from 'lucide-react';

export function ToolsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Wrench}
        title="Project Tools"
        description="Access project management tools"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Plan and organize projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage project tasks and deadlines</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}