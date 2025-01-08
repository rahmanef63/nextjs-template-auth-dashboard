'use client';

import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { BudgetEntry } from '../types';
import { useState } from 'react';

export function ExpenseTracker() {
  const [expenses] = useState<BudgetEntry[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <p className="text-muted-foreground">No expenses recorded</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li key={expense.id} className="text-sm">
                {expense.description} - ${expense.amount.toLocaleString()} - {expense.status}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}