'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Lock } from 'lucide-react';

export function FeaturesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Lock}
        title="Limited Features"
        description="Available features for guest users"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View accessible system features</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn about additional features</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}