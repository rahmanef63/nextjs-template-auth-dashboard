'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { TeamPerformance } from '../types';
import { useState } from 'react';

export function TeamPerformanceView() {
  const [teams] = useState<TeamPerformance[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {teams.length === 0 ? (
          <p className="text-muted-foreground">No team data available</p>
        ) : (
          <ul className="space-y-2">
            {teams.map((team) => (
              <li key={team.id} className="text-sm">
                {team.teamName} - Status: {team.status}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}