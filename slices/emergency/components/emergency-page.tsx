'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function EmergencyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={AlertTriangle}
        title="Emergency Controls"
        description="Critical system controls and emergency actions"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Execute emergency system procedures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monitor critical system metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}