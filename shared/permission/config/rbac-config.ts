import { Role } from 'shared/types';
import { getRoles } from 'shared/storage';

export function getDefaultMenus(role: string): string[] {
  // Administrator has access to everything
  if (role === 'administrator') {
    return [
      'config',
      'security',
      'users',
      'roles',
      'audit',
      'emergency',
      'navigation',
      'department',
      'team',
      'resources',
      'metrics',
      'budget',
      'tasks',
      'collaboration',
      'documents',
      'tools',
      'time',
      'knowledge',
      'support',
      'features',
      'dashboard',
      'profile',
      'settings',
    ];
  }

  // Manager access
  if (role === 'manager') {
    return [
      'department',
      'team',
      'resources',
      'metrics',
      'budget',
      'tasks',
      'collaboration',
      'documents',
      'knowledge',
      'support',
    ];
  }

  // Staff access
  if (role === 'staff') {
    return [
      'tasks',
      'collaboration',
      'documents',
      'tools',
      'time',
      'knowledge',
      'support',
    ];
  }

  // Default (guest) access
  return [
    'knowledge',
    'support',
    'features',
  ];
}