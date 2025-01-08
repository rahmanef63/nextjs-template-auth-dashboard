'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { DollarSign } from 'lucide-react';
import { BudgetOverview } from './budget-overview';
import { ExpenseTracker } from './expense-tracker';

export function BudgetPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={DollarSign}
        title="Budget Management"
        description="Manage and track department budget"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <BudgetOverview />
        <ExpenseTracker />
      </div>
    </div>
  );
}