'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';

export function ResourceAllocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Track department resource usage</p>
      </CardContent>
    </Card>
  );
}