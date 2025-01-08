import { commonMenuItems } from './common';
import { SidebarData } from "../../types/sidebar";
import { Building, Briefcase } from 'lucide-react';

// Import role-specific menus
import { constructionMenu } from './construction';
import { designerMenu } from './designer';
import { architectMenu } from './architect';
import { clientMenu } from './client';

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
    construction: [commonMenuItems, ...constructionMenu],
    designer: [commonMenuItems, ...designerMenu],
    architect: [commonMenuItems, ...architectMenu],
    client: [commonMenuItems, ...clientMenu],
  },
  availableRoles: ['construction', 'designer', 'architect', 'client'],
};