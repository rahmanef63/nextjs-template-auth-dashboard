export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

export const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPES.INFO]: 'Information',
  [NOTIFICATION_TYPES.SUCCESS]: 'Success',
  [NOTIFICATION_TYPES.WARNING]: 'Warning',
  [NOTIFICATION_TYPES.ERROR]: 'Error',
} as const;