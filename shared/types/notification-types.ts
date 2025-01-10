export enum NotificationType {
  SYSTEM = 'SYSTEM',
  REPORT = 'REPORT',
  MESSAGE = 'MESSAGE',
  ALERT = 'ALERT',
  INFO = 'INFO'
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read?: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}