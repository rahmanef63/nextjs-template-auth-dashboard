'use client';

import { Role } from '@/shared/permission/types/rbac-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NavigationState, MenuItem } from '../types/navigation-types';
import { MENU_ITEMS } from '../config/menu-config';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface NavigationStore extends NavigationState {
  setExpanded: (expanded: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      expanded: true,
      items: MENU_ITEMS,
      currentPath: '/',
      setExpanded: (expanded: boolean) => set({ expanded }),
    }),
    {
      name: 'navigation-storage',
    }
  )
);

export const filterMenuItemsByRole = (
  items: MenuItem[],
  session: Session | null
): MenuItem[] => {
  if (!session?.user) return [];

  const userRole = (session.user as any).role || 'user';

  return items.filter(item => {
    if (item.adminOnly && userRole !== 'admin') return false;
    if (item.superAdminOnly && userRole !== 'superadmin') return false;
    if (item.restrictedAccess && !['admin', 'superadmin'].includes(userRole)) return false;
    return true;
  });
};
