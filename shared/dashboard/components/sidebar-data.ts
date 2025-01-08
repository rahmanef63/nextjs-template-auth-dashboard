import {
  Activity,
  Archive,
  AudioWaveform,
  BookOpen,
  Bot,
  Briefcase,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MapPin,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { 
  defaultAdminMenuItems, 
  defaultManagerMenuItems, 
  defaultStaffMenuItems,
  defaultSupportMenuItems 
} from "shared/navigation/config/default-menu"
import { MENU_ITEMS } from "shared/navigation/config/menu-config"
import type { MenuItem, FeatureId } from "shared/navigation/types/navigation-types"

// Menu item categories by feature ID patterns
const MENU_CATEGORIES = {
  admin: /^(config|security|users|audit|emergency|navigation)$/,
  management: /^(department|team|resources|metrics|budget)$/,
  operational: /^(tasks|collaboration|documents|tools|time)$/,
  general: /^(knowledge|support|features)$/
} as const

// Map role names to team plans
const roleToPlan = {
  ADMIN: "Enterprise",
  MANAGER: "Business",
  STAFF: "Pro",
  CLIENT: "Free",
}

// Map role names to team logos
const roleToLogo = {
  ADMIN: GalleryVerticalEnd,
  MANAGER: AudioWaveform,
  STAFF: Command,
  CLIENT: Command,
}

interface SessionUser {
  id: string
  name: string | null
  email: string | null
  role: { 
    id: string
    name: string
    type: string 
  }
  permissions: string[]
  image?: string | null
}

// Filter menu items by category
const filterMenuItemsByCategory = (items: MenuItem[], pattern: RegExp) => {
  return items.filter(item => item.id.match(pattern))
}

export const getTeamData = (role: string) => ({
  name: `${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} Team`,
  logo: roleToLogo[role as keyof typeof roleToLogo] || Command,
  plan: roleToPlan[role as keyof typeof roleToPlan] || "Free",
})

export const getNavMainData = (role: string) => {
  // Filter menu items based on role and categories
  const menuItems = MENU_ITEMS;

  // Filter and group menu items by category
  const groupedItems = {
    admin: filterMenuItemsByCategory(menuItems, MENU_CATEGORIES.admin),
    management: filterMenuItemsByCategory(menuItems, MENU_CATEGORIES.management),
    operational: filterMenuItemsByCategory(menuItems, MENU_CATEGORIES.operational),
    general: filterMenuItemsByCategory(menuItems, MENU_CATEGORIES.general)
  }

  // Transform grouped items to sidebar format
  return Object.entries(groupedItems).flatMap(([category, items]) => 
    items.length > 0 ? [
      {
        title: category.charAt(0).toUpperCase() + category.slice(1),
        items: items.map((item: MenuItem) => ({
          title: item.label,
          url: item.path,
          icon: item.icon,
          items: item.children?.map((child: MenuItem) => ({
            title: child.label,
            url: child.path,
          })) || [],
        }))
      }
    ] : []
  )
}

export const getProjectsData = (role: string) => {
  // Find projects menu item from all items
  const projectMenuItem = MENU_ITEMS.find(item => item.id === 'projects' as FeatureId)

  if (!projectMenuItem) {
    return []
  }

  // Use children if available, otherwise use default structure
  return projectMenuItem.children?.map(child => ({
    name: child.label,
    url: child.path,
    icon: child.icon,
  })) || [
    {
      name: "Active Projects",
      url: "/dashboard/project/active",
      icon: Activity,
    },
    {
      name: "Analytics",
      url: "/dashboard/project/analytics",
      icon: PieChart,
    },
    {
      name: "Location Data",
      url: "/dashboard/project/locations",
      icon: Map,
    }
  ]
}

export const formatUserData = (user: SessionUser) => ({
  name: user.name || "Anonymous User",
  email: user.email || "",
  avatar: user.image || "",
  role: user.role.name,
})

export const getSidebarData = (user: SessionUser) => {
  const role = user.role.name
  return {
    user: formatUserData(user),
    teams: [getTeamData(role)],
    navMain: getNavMainData(role),
    projects: getProjectsData(role),
  }
}
