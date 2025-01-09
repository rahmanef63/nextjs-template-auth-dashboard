export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  systemStatus: 'active' | 'maintenance' | 'down';
  userGrowth: Array<{
    date: string;
    value: number;
  }>;
  activityOverview: Array<{
    date: string;
    value: number;
  }>;
}

export type DashboardWidgetData = {
  stats?: {
    value: number;
    label: string;
    change?: number;
  };
  chart?: {
    labels: string[];
    values: number[];
    type: 'line' | 'bar' | 'pie';
  };
  table?: {
    headers: string[];
    rows: Array<Record<string, string | number>>;
  };
};

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stats' | 'chart' | 'table';
  data: DashboardWidgetData;
}