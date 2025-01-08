export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  details: Record<string, unknown>;
}

export interface UserAction {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'failure';
}