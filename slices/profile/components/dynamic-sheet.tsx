"use client"

import { ResponsiveDialog } from "./responsive-user-menu"
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
const SHEET_CONTENTS = {
  help: <HelpContent />,
  messages: <MessagesContent />,
  notifications: <NotificationsContent />,
  privacy: <PrivacyContent />,
  profile: <ProfileContent />,
  settings: <SettingsContent />,
}

export function DynamicSheet({ type, trigger, open, onOpenChange }: DynamicProps) {
  const content = SHEET_CONTENTS[type]
  const title = USER_MENU_TITLES[type]
  
  if (!content) return null

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      className="h-[95vh] sm:h-[95vh] sm:max-w-[540px] mx-auto"
    >
      <ResponsiveDialog.Header className="px-6 py-4">
        <ResponsiveDialog.Title>{title}</ResponsiveDialog.Title>
      </ResponsiveDialog.Header>
      <ResponsiveDialog.Content className="px-6 pb-6">
        {content}
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}
