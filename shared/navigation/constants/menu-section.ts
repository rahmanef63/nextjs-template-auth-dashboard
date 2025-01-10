import { 
  LayoutDashboard, 
  Blocks, 
  Settings, 
  FileText,
  ShieldCheck,
  MoreHorizontal,
  LucideIcon
} from 'lucide-react';

// Define menu section enum
export enum MenuSectionKey {
  OVERVIEW = 'OVERVIEW',
  FEATURES = 'FEATURES',
  MANAGEMENT = 'MANAGEMENT',
  SETTINGS = 'SETTINGS',
  RESOURCES = 'RESOURCES',
  OTHER = 'OTHER'
}

// Define menu section metadata type
export interface MenuSectionMetadata {
  id: string;
  title: string;
  icon: LucideIcon;
  hideTitle?: boolean;
}

// Define menu section metadata
export const MenuSections: Record<MenuSectionKey, MenuSectionMetadata> = {
  [MenuSectionKey.OVERVIEW]: {
    id: 'overview',
    title: 'Overview',
    icon: LayoutDashboard,
    hideTitle: true
  },
  [MenuSectionKey.FEATURES]: {
    id: 'features',
    title: 'Features',
    icon: Blocks,
    hideTitle: true
  },
  [MenuSectionKey.MANAGEMENT]: {
    id: 'management',
    title: 'Management',
    icon: ShieldCheck,
    hideTitle: true
  },
  [MenuSectionKey.SETTINGS]: {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    hideTitle: true
  },
  [MenuSectionKey.RESOURCES]: {
    id: 'resources',
    title: 'Resources',
    icon: FileText,
    hideTitle: true
  },
  [MenuSectionKey.OTHER]: {
    id: 'other',
    title: 'Other',
    icon: MoreHorizontal,
    hideTitle: true
  }
};
