import { LayoutDashboard, DollarSign, BarChart2, Folder, Calendar, Receipt, CreditCard, LineChart, PieChart, BarChart, Activity } from 'lucide-react';

export const clientMenu = [
  {
    title: 'Client Portal',
    items: [
      {
        label: 'Project Overview',
        icon: LayoutDashboard,
        subItems: [
          { label: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
          { label: 'Active Projects', href: '/client/projects', icon: Folder },
          { label: 'Timeline', href: '/client/timeline', icon: Calendar },
        ],
      },
      {
        label: 'Financial',
        icon: DollarSign,
        subItems: [
          { label: 'Invoices', href: '/client/invoices', icon: Receipt },
          { label: 'Payments', href: '/client/payments', icon: CreditCard },
          { label: 'Budget', href: '/client/budget', icon: LineChart },
        ],
      },
      {
        label: 'Reports',
        icon: BarChart2,
        subItems: [
          { label: 'Progress Reports', href: '/client/progress-reports', icon: PieChart },
          { label: 'Financial Reports', href: '/client/financial-reports', icon: BarChart },
          { label: 'Analytics', href: '/client/analytics', icon: Activity },
        ],
      },
    ],
  },
];