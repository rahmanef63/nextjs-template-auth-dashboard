import { PermissionAction } from '../types/permission-types';
import crypto from 'crypto';

interface RoleActivity {
  id: string;
  roleId: string;
  action: PermissionAction;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
}

const ACTIVITY_STORAGE_KEY = 'role_activity_log';

export class RoleActivityMonitor {
  static logActivity(
    roleId: string,
    action: RoleActivity['action'],
    performedBy: string,
    details: Record<string, unknown>
  ): void {
    try {
      const activities = this.getActivities();
      
      const newActivity: RoleActivity = {
        id: crypto.randomUUID(),
        roleId,
        action,
        performedBy,
        timestamp: new Date().toISOString(),
        details,
      };

      activities.unshift(newActivity);
      
      // Keep only last 100 activities
      const trimmedActivities = activities.slice(0, 100);
      
      localStorage.setItem(
        ACTIVITY_STORAGE_KEY,
        JSON.stringify(trimmedActivities)
      );
    } catch (error) {
      console.error('Error logging role activity:', error);
    }
  }

  static getActivities(): RoleActivity[] {
    try {
      const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static clearActivities(): void {
    try {
      localStorage.removeItem(ACTIVITY_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing role activities:', error);
    }
  }
}