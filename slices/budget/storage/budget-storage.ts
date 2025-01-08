import { StorageManager } from 'shared/storage/utils/storage-manager';
import { STORAGE_KEYS } from 'shared/storage/constants/storage.constants';
import { BudgetEntry } from '../types/budget.types';

export class BudgetStorage {
  private storage: StorageManager;

  constructor() {
    this.storage = new StorageManager();
  }

  getBudgetEntries(): BudgetEntry[] {
    return this.storage.get<BudgetEntry[]>(STORAGE_KEYS.budget) || [];
  }

  addBudgetEntry(entry: Omit<BudgetEntry, 'id' | 'createdAt' | 'updatedAt'>): BudgetEntry {
    const newEntry: BudgetEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.storage.update<BudgetEntry[]>(
      STORAGE_KEYS.budget,
      (entries = []) => [...entries, newEntry]
    );
    return newEntry;
  }

  updateBudgetEntry(id: string, updates: Partial<BudgetEntry>): void {
    this.storage.update<BudgetEntry[]>(
      STORAGE_KEYS.budget,
      (entries = []) => entries.map(entry =>
        entry.id === id
          ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
          : entry
      )
    );
  }

  deleteBudgetEntry(id: string): void {
    this.storage.update<BudgetEntry[]>(
      STORAGE_KEYS.budget,
      (entries = []) => entries.filter(entry => entry.id !== id)
    );
  }
}