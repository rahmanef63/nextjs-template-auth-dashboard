'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { FileText } from 'lucide-react';

export function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Document Management"
        description="Manage and organize documents"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Browse and manage documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Organize documents by category</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}