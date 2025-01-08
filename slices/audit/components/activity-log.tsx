'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { AuditLog } from '../types';
import { useState } from 'react';

export function ActivityLog() {
  const [logs] = useState<AuditLog[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-muted-foreground">No activity logs available</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li key={log.id} className="text-sm">
                {log.action} - {log.resource} - {log.timestamp.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}