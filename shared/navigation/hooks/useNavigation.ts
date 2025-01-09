'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuItem } from '../types/navigation-types';
import { useNavigationStore } from '../lib/navigation-store';

export const useNavigation = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { items, expanded, setExpanded } = useNavigationStore();

  const navigate = useCallback((item: MenuItem) => {
    router.push(item.path);
  }, [router]);

  return {
    items,
    expanded,
    currentPath,
    navigate,
    setExpanded,
  };
};
