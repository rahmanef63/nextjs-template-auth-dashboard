'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { BudgetSummary } from '../types';
import { useState } from 'react';

export function BudgetOverview() {
  const [summary] = useState<BudgetSummary>({
    totalBudget: 0,
    allocated: 0,
    remaining: 0,
    expenses: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Budget:</span>
            <span>${summary.totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Allocated:</span>
            <span>${summary.allocated.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining:</span>
            <span>${summary.remaining.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Expenses:</span>
            <span>${summary.expenses.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}