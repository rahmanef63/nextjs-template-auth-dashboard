import { apiClient } from 'shared/lib/apiClient';
import { logger } from 'shared/lib/logger';
import type { AnalyticsData } from '@/shared/types/analytics-types';

export class AnalyticsService {
  private static instance: AnalyticsService;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async trackEvent(eventName: string, data: Record<string, unknown>) {
    try {
      await apiClient.post('/api/analytics/events', {
        name: eventName,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Failed to track analytics event', { eventName, data, error });
    }
  }

  async getAnalytics(startDate: Date, endDate: Date): Promise<AnalyticsData> {
    try {
      const response = await apiClient.get<AnalyticsData>(
        `/api/analytics/data?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
      );
      return response.data!;
    } catch (error) {
      logger.error('Failed to fetch analytics data', { startDate, endDate, error });
      throw error;
    }
  }
}

export const analyticsService = AnalyticsService.getInstance();