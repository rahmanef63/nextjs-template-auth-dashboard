import { prisma } from '../config/database';
import { logger } from './logger';

export interface AuditLogData {
  userId: string;
  action: string;
  resource: string;
  details?: Record<string, unknown>;
}

export async function createAuditLog(data: AuditLogData) {
  try {
    const log = await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        resource: data.resource,
        details: data.details ? JSON.stringify(data.details) : null,
      },
    });

    logger.info('Audit log created', { logId: log.id, ...data });
    return log;
  } catch (error) {
    logger.error('Failed to create audit log', { error, data });
    throw error;
  }
}

export async function getAuditLogs(userId?: string, limit = 50) {
  try {
    const where = userId ? { userId } : {};
    return await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    logger.error('Failed to fetch audit logs', { error, userId });
    throw error;
  }
}