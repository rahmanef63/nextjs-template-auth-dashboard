'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { HelpCircle } from 'lucide-react';

export function KnowledgePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={HelpCircle}
        title="Knowledge Base"
        description="Access system documentation and guides"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Browse system documentation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn how to use the system</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}