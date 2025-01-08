import { LayoutDashboard, Settings, Bell, User } from 'lucide-react';

export const commonMenuItems = {
  title: 'General',
  items: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      subItems: [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Profile', href: '/profile', icon: User },
        { label: 'Notifications', href: '/notifications', icon: Bell },
        { label: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ],
};