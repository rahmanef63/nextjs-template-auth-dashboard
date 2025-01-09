import { saveToStorage, getFromStorage, removeFromStorage } from 'shared/storage/lib/storage-lib';
import { STORAGE_KEYS } from 'shared/storage/config/storage-config';
import { Metric } from '../types/metric.types';

export class MetricsStorage {
  constructor() {}

  getMetrics(): Metric[] {
    return getFromStorage<Metric[]>(STORAGE_KEYS.METRICS) || [];
  }

  addMetric(metric: Omit<Metric, 'id' | 'timestamp'>): Metric {
    const newMetric: Metric = {
      ...metric,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const metrics = this.getMetrics();
    saveToStorage(STORAGE_KEYS.METRICS, [...metrics, newMetric]);
    return newMetric;
  }

  updateMetric(id: string, updates: Partial<Omit<Metric, 'id' | 'timestamp'>>): void {
    const metrics = this.getMetrics();
    const updatedMetrics = metrics.map(metric =>
      metric.id === id
        ? { ...metric, ...updates, timestamp: new Date().toISOString() }
        : metric
    );
    saveToStorage(STORAGE_KEYS.METRICS, updatedMetrics);
  }

  deleteMetric(id: string): void {
    const metrics = this.getMetrics();
    const updatedMetrics = metrics.filter(metric => metric.id !== id);
    saveToStorage(STORAGE_KEYS.METRICS, updatedMetrics);
  }
}