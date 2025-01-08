import { apiClient } from 'shared/lib/apiClient';
import { DashboardStats, DashboardWidget } from '../types';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await apiClient.get<DashboardStats>('/api/dashboard/stats');
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch dashboard stats');
  }
  return response.data!;
}

export async function fetchDashboardWidgets(): Promise<DashboardWidget[]> {
  const response = await apiClient.get<DashboardWidget[]>('/api/dashboard/widgets');
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch dashboard widgets');
  }
  return response.data!;
}