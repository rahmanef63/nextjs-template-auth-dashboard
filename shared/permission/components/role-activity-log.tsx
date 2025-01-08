'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { RoleActivityMonitor } from '@/lib/roles/activity-monitor';
import { ScrollArea } from 'shared/components/ui/scroll-area';

export function RoleActivityLog() {
  const [activities, setActivities] = useState<ReturnType<typeof RoleActivityMonitor.getActivities>>([]);

  useEffect(() => {
    setActivities(RoleActivityMonitor.getActivities());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {activities.length === 0 ? (
            <p className="text-muted-foreground">No activities recorded</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col space-y-1 border-b pb-2 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {activity.action.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm">
                    Role: {activity.roleId}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    By: {activity.performedBy}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}