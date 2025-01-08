import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  label?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}



export interface UserNavItem {
  id: string
  title: string
  href?: string
  onClick?: () => void
}

export interface User {
  name?: string;
  email: string
  avatar?: string
  id: string;
  role: 'admin' | 'staff' | 'manager';
  createdAt: Date;
  updatedAt: Date;
}