export interface ExportOptions {
  format: 'csv' | 'json' | 'xlsx';
  filters?: Record<string, unknown>;
  fields?: string[];
  includeHeaders?: boolean;
}

export interface ExportResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
  createdAt: string;
  completedAt?: string;
}