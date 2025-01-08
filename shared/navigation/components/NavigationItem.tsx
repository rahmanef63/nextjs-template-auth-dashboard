'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from 'shared/lib/utils';
import { MenuItem, NavigationItemProps } from '../types/navigation-types';
import { useNavigation } from '../hooks/useNavigation';

export interface NavigationItemComponent extends React.FC<NavigationItemProps> {}

export const NavigationItem: NavigationItemComponent = ({ 
  item,
  className
}) => {
  const { currentPath } = useNavigation();
  const isActive = currentPath === item.path;
  
  if (!item.icon) return null;
  
  return (
    <Link
      href={item.path}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
        isActive && 'bg-accent',
        className
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );
};
