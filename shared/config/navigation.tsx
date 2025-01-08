import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  MessagesSquare,
  BarChart3,
  Settings,
  Bell,
  Folder,
  Calendar,
} from "lucide-react"
import { NavSection } from "../types/sidebar"

export const navigationConfig: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "/users",
        icon: Users,
      },
      {
        title: "Projects",
        href: "/projects",
        icon: Building2,
      },
      {
        title: "Documents",
        href: "/documents",
        icon: FileText,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        title: "Messages",
        href: "/messages",
        icon: MessagesSquare,
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
      {
        title: "Files",
        href: "/files",
        icon: Folder,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
]

export const userNavConfig = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.png",
  },
  items: [
    {
      id: "profile",
      title: "Profile",
      href: "/profile",
    },
    {
      id: "settings",
      title: "Settings",
      href: "/settings",
    },
    {
      id: "logout",
      title: "Log out",
      onClick: () => {
        // Add logout logic here
        console.log("Logging out...")
      },
    },
  ],
}