export interface BudgetEntry {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BudgetSummary {
  totalBudget: number;
  allocated: number;
  remaining: number;
  expenses: number;
}