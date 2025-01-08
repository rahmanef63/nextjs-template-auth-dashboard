'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { DepartmentMetric } from '../types';
import { useState } from 'react';

export function DepartmentOverview() {
  const [metrics] = useState<DepartmentMetric[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {metrics.length === 0 ? (
          <p className="text-muted-foreground">No metrics available</p>
        ) : (
          <ul className="space-y-2">
            {metrics.map((metric) => (
              <li key={metric.id} className="text-sm">
                {metric.name}: {metric.value}{metric.unit} ({metric.trend})
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}