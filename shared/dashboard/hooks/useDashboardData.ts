import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchDashboardWidgets } from 'shared/dashboard/lib/api';

export function useDashboardData() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const { data: widgets, isLoading: isWidgetsLoading } = useQuery({
    queryKey: ['dashboardWidgets'],
    queryFn: fetchDashboardWidgets,
  });

  return {
    stats,
    widgets,
    isLoading: isStatsLoading || isWidgetsLoading,
  };
}