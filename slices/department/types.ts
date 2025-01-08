export interface DepartmentMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface TeamPerformance {
  id: string;
  teamName: string;
  metrics: DepartmentMetric[];
  status: 'on_track' | 'at_risk' | 'behind';
}