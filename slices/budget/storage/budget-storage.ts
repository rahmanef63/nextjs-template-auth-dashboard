import { saveToStorage, getFromStorage, removeFromStorage } from 'shared/storage/lib/storage-lib';
import { STORAGE_KEYS } from 'shared/storage/config/storage-config';
import { BudgetEntry } from '../types/budget.types';

export class BudgetStorage {
  constructor() {}

  getBudgetEntries(): BudgetEntry[] {
    return getFromStorage<BudgetEntry[]>(STORAGE_KEYS.BUDGET) || [];
  }

  addBudgetEntry(entry: Omit<BudgetEntry, 'id' | 'createdAt' | 'updatedAt'>): BudgetEntry {
    const newEntry: BudgetEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const entries = this.getBudgetEntries();
    saveToStorage(STORAGE_KEYS.BUDGET, [...entries, newEntry]);
    return newEntry;
  }

  updateBudgetEntry(id: string, updates: Partial<Omit<BudgetEntry, 'id' | 'createdAt' | 'updatedAt'>>): void {
    const entries = this.getBudgetEntries();
    const updatedEntries = entries.map(entry =>
      entry.id === id
        ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
        : entry
    );
    saveToStorage(STORAGE_KEYS.BUDGET, updatedEntries);
  }

  deleteBudgetEntry(id: string): void {
    const entries = this.getBudgetEntries();
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveToStorage(STORAGE_KEYS.BUDGET, updatedEntries);
  }
}