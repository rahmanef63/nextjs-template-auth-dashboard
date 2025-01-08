'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Users } from 'lucide-react';

export function UserManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Users}
        title="User Management"
        description="Manage system users and their permissions"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage system users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Role Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Assign and manage user roles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}