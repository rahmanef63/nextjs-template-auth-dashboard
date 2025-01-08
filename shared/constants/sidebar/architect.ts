import { Map, Shield, ListCheck, FileCode, Box, FileSearch, FileText, HardDrive, Table, Lightbulb, Zap, FileCheck } from 'lucide-react';

export const architectMenu = [
  {
    title: 'Architecture',
    items: [
      {
        label: 'Project Planning',
        icon: Map,
        subItems: [
          { label: 'Blueprints', href: '/architecture/blueprints', icon: FileCode },
          { label: '3D Models', href: '/architecture/models', icon: Box },
          { label: 'Site Analysis', href: '/architecture/site-analysis', icon: FileSearch },
          { label: 'Specifications', href: '/architecture/specifications', icon: FileText },
        ],
      },
      {
        label: 'Technical',
        icon: Shield,
        subItems: [
          { label: 'Standards', href: '/architecture/standards', icon: Shield },
          { label: 'Documentation', href: '/architecture/documentation', icon: HardDrive },
          { label: 'Resources', href: '/architecture/resources', icon: Table },
        ],
      },
      {
        label: 'Reviews',
        icon: ListCheck,
        subItems: [
          { label: 'Design Reviews', href: '/architecture/design-reviews', icon: Lightbulb },
          { label: 'Technical Reviews', href: '/architecture/technical-reviews', icon: Zap },
          { label: 'Compliance', href: '/architecture/compliance', icon: FileCheck },
        ],
      },
    ],
  },
];