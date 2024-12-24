import { apiClient } from 'shared/lib/apiClient';
import { logger } from 'shared/lib/logger';
import type { ExportOptions, ExportResult } from 'shared/types/export';

export class ExportService {
  private static instance: ExportService;

  private constructor() {}

  public static getInstance(): ExportService {
    if (!ExportService.instance) {
      ExportService.instance = new ExportService();
    }
    return ExportService.instance;
  }

  async exportData(type: string, options: ExportOptions): Promise<ExportResult> {
    try {
      const response = await apiClient.post<ExportResult>('/api/export', {
        type,
        options
      });
      return response.data!;
    } catch (error) {
      logger.error('Failed to export data', { type, options, error });
      throw error;
    }
  }

  async getExportStatus(exportId: string): Promise<ExportResult> {
    try {
      const response = await apiClient.get<ExportResult>(`/api/export/${exportId}`);
      return response.data!;
    } catch (error) {
      logger.error('Failed to get export status', { exportId, error });
      throw error;
    }
  }
}

export const exportService = ExportService.getInstance();