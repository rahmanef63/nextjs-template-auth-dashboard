'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Package } from 'lucide-react';

export function ResourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Package}
        title="Resources"
        description="Access and manage available resources"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access system documentation and guides</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Download available resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access document templates</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}