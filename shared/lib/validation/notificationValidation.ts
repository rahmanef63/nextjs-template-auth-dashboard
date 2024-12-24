import { z } from 'zod';
import { NOTIFICATION_TYPES } from 'shared/constants/notifications';

export const notificationSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  type: z.enum([
    NOTIFICATION_TYPES.INFO,
    NOTIFICATION_TYPES.SUCCESS,
    NOTIFICATION_TYPES.WARNING,
    NOTIFICATION_TYPES.ERROR,
  ]),
  userId: z.string().uuid(),
  metadata: z.record(z.any()).optional(),
});

export type NotificationInput = z.infer<typeof notificationSchema>;