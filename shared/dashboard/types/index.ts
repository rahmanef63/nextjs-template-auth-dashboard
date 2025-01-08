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

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stats' | 'chart' | 'table';
  data: any;
}