import { Hammer, MessagesSquare, Building, Activity, Calendar, FileSignature, DollarSign, MessageSquare, Bell, FileText, Pencil, Briefcase } from 'lucide-react';

export const constructionMenu = [
  {
    title: 'Projects',
    items: [
      {
        label: 'Project Management',
        icon: Hammer,
        subItems: [
          { label: 'Active Sites', href: '/projects/sites', icon: Building },
          { label: 'Progress', href: '/projects/progress', icon: Activity },
          { label: 'Schedule', href: '/projects/schedule', icon: Calendar },
          { label: 'Contracts', href: '/projects/contracts', icon: FileSignature },
          { label: 'Budget Tracking', href: '/projects/budget-tracking', icon: DollarSign },
        ],
      },
      {
        label: 'Communication',
        icon: MessagesSquare,
        subItems: [
          { label: 'Chat', href: '/chat', icon: MessageSquare },
          { label: 'Notifications', href: '/notifications', icon: Bell },
          { label: 'Announcements', href: '/communication/announcements', icon: FileText },
          { label: 'Feedback', href: '/communication/feedback', icon: Pencil },
          { label: 'Support', href: '/communication/support', icon: Briefcase },
        ],
      },
    ],
  },
];