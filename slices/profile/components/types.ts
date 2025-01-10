import { ReactNode } from "react"

export type UserMenuType = "help" | "messages" | "notifications" | "privacy" | "profile" | "settings"

export interface DynamicProps {
  type: UserMenuType
  trigger: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const USER_MENU_TITLES: Record<UserMenuType, string> = {
  help: "Help & Support",
  messages: "Messages",
  notifications: "Notifications",
  privacy: "Privacy Settings",
  profile: "Profile",
  settings: "Settings",
}

export const DIALOG_CONTENTS: Record<UserMenuType, ReactNode> = {
  help: null, // These will be imported and set in the components
  messages: null,
  notifications: null,
  privacy: null,
  profile: null,
  settings: null,
}
