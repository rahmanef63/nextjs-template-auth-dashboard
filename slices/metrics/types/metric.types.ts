export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  category: string;
  trend?: 'up' | 'down' | 'stable';
}