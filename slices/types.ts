import { MenuItem } from '@/shared/navigation/types/navigation-types';
import { LucideIcon } from 'lucide-react';
import { MenuSectionKey } from '@/shared/navigation/constants/menu-section';

export interface SliceNavigation extends MenuItem {
  id?: string;
  title: string;
  href: string;
  icon: LucideIcon;
  items?: MenuItem[];
  menuSection: MenuSectionKey;
}

export interface SliceConfig {
  id?: string;
  title: string;
  basePath: string;
  navigation: SliceNavigation;
  routes: Record<string, string>;
  menuSection: MenuSectionKey;
}

export type SliceRegistry = Record<string, SliceConfig>;
