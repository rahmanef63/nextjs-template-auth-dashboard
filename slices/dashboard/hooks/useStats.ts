'use client';

import { useState, useEffect } from 'react';
import { apiClient } from 'shared/lib/apiClient';
import { DashboardStats } from 'slices/dashboard/types';

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await apiClient.get<DashboardStats>('/api/dashboard/stats');
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}