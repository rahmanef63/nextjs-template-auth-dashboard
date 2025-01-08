'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { LifeBuoy } from 'lucide-react';

export function SupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={LifeBuoy}
        title="Support Access"
        description="Get help and support"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Help Center</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access support resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get in touch with our support team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}