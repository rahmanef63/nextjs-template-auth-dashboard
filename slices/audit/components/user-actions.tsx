'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { UserAction } from '../types';
import { useState } from 'react';

export function UserActions() {
  const [actions] = useState<UserAction[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {actions.length === 0 ? (
          <p className="text-muted-foreground">No user actions recorded</p>
        ) : (
          <ul className="space-y-2">
            {actions.map((action) => (
              <li key={action.id} className="text-sm">
                {action.action} - {action.status} - {action.timestamp.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}