"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Mail,
  Shield,
  Keyboard,
  HelpCircle,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "shared/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "shared/components/ui/sidebar"
import { useAuth } from "shared/hooks/useAuth"
import { useToast } from "shared/hooks/use-toast"
import { useState, useEffect } from 'react'
import { DynamicSheet } from "./dynamic-sheet"
import { DynamicDrawer } from "./dynamic-drawer"
import { Button } from "shared/components/ui/button"
import { useMediaQuery } from "shared/hooks/use-media-query"
import { UserMenuType } from './types'

export function UserProfile() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isMobile, state } = useSidebar()
  const [activeDialog, setActiveDialog] = useState<UserMenuType | null>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Close dropdown when sidebar collapses
  useEffect(() => {
    if (state === "collapsed") {
      setDropdownOpen(false)
    }
  }, [state])

  if (!user) return null

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logging out...",
        description: "You will be redirected to the login page.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  const userMenuTypes: UserMenuType[] = ["settings", "profile", "notifications", "messages", "privacy", "help"]

  const handleDialogOpen = (type: UserMenuType) => {
    setActiveDialog(type)
    setDropdownOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) setActiveDialog(null)
  }

  return (
    <>
      {userMenuTypes.map((type) => (
        isDesktop ? (
          <DynamicSheet
            key={type}
            type={type}
            open={activeDialog === type}
            onOpenChange={handleOpenChange}
            trigger={<Button variant="ghost" className="hidden" />}
          />
        ) : (
          <DynamicDrawer
            key={type}
            type={type}
            open={activeDialog === type}
            onOpenChange={handleOpenChange}
            trigger={<Button variant="ghost" className="hidden" />}
          />
        )
      ))}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name || "User"}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name || "User"}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => handleDialogOpen("profile")}>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Account
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDialogOpen("notifications")}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDialogOpen("messages")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                  <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDialogOpen("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDialogOpen("privacy")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({
                  title: "Keyboard Shortcuts",
                  description: "Press '?' to view all keyboard shortcuts",
                })}>
                  <Keyboard className="mr-2 h-4 w-4" />
                  Keyboard shortcuts
                  <DropdownMenuShortcut>?</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDialogOpen("help")}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}