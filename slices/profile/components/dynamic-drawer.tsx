"use client"

import { ReactNode } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "shared/components/ui/drawer"
import {
  HelpContent,
  MessagesContent,
  NotificationsContent,
  PrivacyContent,
  ProfileContent,
  SettingsContent,
} from "./contents"
import { DynamicProps, USER_MENU_TITLES } from "./types"

// Initialize contents here to avoid circular dependencies
const DRAWER_CONTENTS: Record<DynamicProps["type"], ReactNode> = {
  help: <HelpContent />,
  messages: <MessagesContent />,
  notifications: <NotificationsContent />,
  privacy: <PrivacyContent />,
  profile: <ProfileContent />,
  settings: <SettingsContent />,
}

export function DynamicDrawer({ type, trigger, open, onOpenChange }: DynamicProps) {
  const content = DRAWER_CONTENTS[type]
  const title = USER_MENU_TITLES[type]
  
  if (!content) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className="hidden" data-drawer-trigger={type}>
        Open {title}
      </DrawerTrigger>
      <DrawerContent className="max-w-[90%] w-full sm:max-w-[540px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-6">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
