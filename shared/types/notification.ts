export enum NotificationType {
  SYSTEM = 'SYSTEM',
  REPORT = 'REPORT',
  MESSAGE = 'MESSAGE',
  ALERT = 'ALERT',
  INFO = 'INFO',
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  userId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
