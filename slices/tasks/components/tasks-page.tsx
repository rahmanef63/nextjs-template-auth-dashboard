'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Kanban } from 'lucide-react';

export function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Kanban}
        title="Task Board"
        description="Manage and track your tasks"
      />
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tasks that need to be started</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tasks currently being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Finished tasks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}