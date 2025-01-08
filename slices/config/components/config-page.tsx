'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Cog } from 'lucide-react';

export function ConfigPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Cog}
        title="Global Configuration"
        description="Manage system-wide settings and configurations"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure global system parameters and defaults</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage environment-specific configurations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}