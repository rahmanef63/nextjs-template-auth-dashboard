'use client';

import { Role, RoleType } from 'shared/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NavigationState, MenuItem } from '../types/navigation-types';
import { MENU_ITEMS } from '../config/menu-config';
import { useSession } from 'next-auth/react';

interface NavigationStore extends NavigationState {
  setExpanded: (expanded: boolean) => void;
}

export const isValidRoute = (path: string, role?: string): boolean => {
  if (path === '/dashboard') return true;
  
  // If no role is provided, just check if the path exists
  if (!role) {
    return MENU_ITEMS.some(item => item.path === path);
  }

  // If role is provided, check if the path exists and is accessible for the role
  return MENU_ITEMS.some(item => 
    item.path === path && (!item.roles || item.roles.includes(role))
  );
};

export const getDefaultRoute = (role?: string): string => {
  // If no role or default role, return dashboard
  if (!role || role === 'user') {
    return '/dashboard';
  }

  // For admin and other roles, you can customize the default route
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/dashboard';
  }
};

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

export const useNavigationItems = () => {
  const { data: session } = useSession();
  const { items } = useNavigationStore();

  if (!session?.user) {
    return [];
  }

  const userRole = session.user.role?.type;

  // Filter menu items based on user role
  return items.filter((item: MenuItem) => {
    // Admin has access to all items
    if (userRole === RoleType.ADMIN) {
      return true;
    }

    // Manager has access to management and operational items
    if (userRole === RoleType.MANAGER) {
      return item.id.match(/^(department|team|resources|metrics|budget|tasks|collaboration|documents|tools|time)$/);
    }

    // Staff has access to operational items
    if (userRole === RoleType.STAFF) {
      return item.id.match(/^(tasks|collaboration|documents|tools|time)$/);
    }

    // Client/Guest has access to general items
    return item.id.match(/^(knowledge|support|features)$/);
  });
};
