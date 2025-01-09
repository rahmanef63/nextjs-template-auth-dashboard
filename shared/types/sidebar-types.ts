import { BaseUser } from "../auth/types";
import { MenuItem, NavigationSection } from "../navigation/types";
import { RoleType } from "../types";

export interface SidebarNavItem extends MenuItem {
  disabled?: boolean
  external?: boolean
}

export interface SidebarSection extends NavigationSection {
  title: string
  items: SidebarNavItem[]
}

export interface SidebarUserNavItem extends Pick<BaseUser, 'name' | 'email' | 'role'> {
  avatar?: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: RoleType;
  };
  roleMenus: {
    [key: string]: NavigationSection[];
  };
  availableRoles: string[];
}
