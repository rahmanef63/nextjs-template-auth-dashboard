import { RoleType } from '../types';
import { MenuItem } from '../../navigation/types';
import { ADMIN_MENU_ITEMS, MANAGER_MENU_ITEMS, CORE_MENU_ITEMS } from '../config/menu-config';

export const NAVIGATION_CONFIG: Record<RoleType, MenuItem[]> = {
  ADMIN: ADMIN_MENU_ITEMS,
  MANAGER: MANAGER_MENU_ITEMS,
  STAFF: MANAGER_MENU_ITEMS.filter((item: MenuItem) => !item.permission?.includes('write')),
  CLIENT: CORE_MENU_ITEMS.filter((item: MenuItem) => item.permission === 'dashboard:read'),
  CUSTOM: []
};
