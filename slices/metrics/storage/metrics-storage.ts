import { StorageManager } from 'shared/storage/utils/storage-manager';
import { STORAGE_KEYS } from 'shared/storage/constants/storage.constants';
import { Metric } from '../types/metric.types';

export class MetricsStorage {
  private storage: StorageManager;

  constructor() {
    this.storage = new StorageManager();
  }

  getMetrics(): Metric[] {
    return this.storage.get<Metric[]>(STORAGE_KEYS.metrics) || [];
  }

  addMetric(metric: Omit<Metric, 'id' | 'timestamp'>): Metric {
    const newMetric: Metric = {
      ...metric,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    this.storage.update<Metric[]>(
      STORAGE_KEYS.metrics,
      (metrics = []) => [...metrics, newMetric]
    );
    return newMetric;
  }

  updateMetric(id: string, updates: Partial<Metric>): void {
    this.storage.update<Metric[]>(
      STORAGE_KEYS.metrics,
      (metrics = []) => metrics.map(metric =>
        metric.id === id ? { ...metric, ...updates } : metric
      )
    );
  }

  deleteMetric(id: string): void {
    this.storage.update<Metric[]>(
      STORAGE_KEYS.metrics,
      (metrics = []) => metrics.filter(metric => metric.id !== id)
    );
  }
}