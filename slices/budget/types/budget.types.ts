export interface BudgetEntry {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}