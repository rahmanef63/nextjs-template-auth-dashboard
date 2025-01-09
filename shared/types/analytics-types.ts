export interface AnalyticsEvent {
  id: string;
  name: string;
  data: Record<string, unknown>;
  timestamp: string;
  userId?: string;
}

export interface AnalyticsData {
  events: AnalyticsEvent[];
  metrics: {
    totalEvents: number;
    uniqueUsers: number;
    averageEventsPerUser: number;
  };
  period: {
    start: string;
    end: string;
  };
}