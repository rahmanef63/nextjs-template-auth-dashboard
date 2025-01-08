import {
  Home,
  ClipboardList,
  Building,
  Users,
  Settings,
  FileText,
  Briefcase,
  Globe,
  LayoutDashboard,
  Calendar,
  MessagesSquare,
  Bell,
  FileCheck,
  Hammer,
  Pencil,
  Ruler,
  UserCircle,
  BarChart2,
  ListCheck,
  FileSignature,
  PenTool,
  Star,
  Box,
  Map,
  FileSearch,
  Layout,
  DollarSign,
  User,
  MessageSquare,
  Folder,
  Palette,
  Layers,
  Code,
  Image,
  Figma,
  Crop,
  Columns,
  Laptop,
  Lightbulb,
  Zap,
  Shield,
  HardDrive,
  FileCode,
  Table,
  Receipt,
  CreditCard,
  LineChart,
  PieChart,
  BarChart,
  Activity,
} from 'lucide-react';
import { SidebarData } from "../types/sidebar";

export const sidebarData: SidebarData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "construction"
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Building,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Briefcase,
      plan: "Startup",
    },
  ],
  roleMenus: {
    construction: [
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
    ],
    designer: [
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
    ],
    architect: [
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
    ],
    client: [
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
    ],
  },
  availableRoles: ['construction', 'designer', 'architect', 'client'],
};