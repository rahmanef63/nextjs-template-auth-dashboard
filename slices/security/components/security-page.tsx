'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Shield } from 'lucide-react';

export function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Shield}
        title="Security Settings"
        description="Manage system security and access controls"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure role-based access control settings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Define and manage security policies</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}