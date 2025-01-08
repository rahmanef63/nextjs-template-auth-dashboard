import { Palette, PenTool, Users, Layers, Image, Code, Figma, Crop, Columns, Laptop, MessageSquare, Star } from 'lucide-react';

export const designerMenu = [
  {
    title: 'Design',
    items: [
      {
        label: 'Design Projects',
        icon: Palette,
        subItems: [
          { label: 'Wireframes', href: '/design/wireframes', icon: Layers },
          { label: 'Mockups', href: '/design/mockups', icon: Image },
          { label: 'Prototypes', href: '/design/prototypes', icon: Code },
        ],
      },
      {
        label: 'Design Tools',
        icon: PenTool,
        subItems: [
          { label: 'Design System', href: '/design/system', icon: Figma },
          { label: 'Assets Library', href: '/design/assets', icon: Image },
          { label: 'Components', href: '/design/components', icon: Crop },
          { label: 'Templates', href: '/design/templates', icon: Columns },
        ],
      },
      {
        label: 'Collaboration',
        icon: Users,
        subItems: [
          { label: 'Team Projects', href: '/design/team-projects', icon: Laptop },
          { label: 'Feedback', href: '/design/feedback', icon: MessageSquare },
          { label: 'Reviews', href: '/design/reviews', icon: Star },
        ],
      },
    ],
  },
];