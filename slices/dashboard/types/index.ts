export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  systemStatus: 'active' | 'maintenance' | 'down';
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stats' | 'chart' | 'table';
  data: any;
}