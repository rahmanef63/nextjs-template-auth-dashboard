import { apiClient } from 'shared/lib/apiClient';
import { logger } from 'shared/lib/logger';
import type { Notification } from 'shared/types/Notification';

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await apiClient.get<Notification[]>('/api/notifications');
      return response.data!;
    } catch (error) {
      logger.error('Failed to fetch notifications', { error });
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await apiClient.put(`/api/notifications/${notificationId}/read`, {});
    } catch (error) {
      logger.error('Failed to mark notification as read', { notificationId, error });
      throw error;
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.put('/api/notifications/read-all', {});
    } catch (error) {
      logger.error('Failed to mark all notifications as read', { error });
      throw error;
    }
  }
}

export const notificationService = NotificationService.getInstance();