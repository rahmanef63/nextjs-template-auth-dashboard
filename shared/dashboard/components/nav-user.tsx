"use client"

import { UserSettingsSheet } from "@/slices/profile/components/drawers/settings-drawer";
import { ProfileDrawer } from "slices/profile/components/drawers/profile-drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "shared/components/ui/dropdown-menu";

import {
  Settings,
  User,
  LogOut,
  Bell,
  Mail,
  Shield,
  Keyboard,
  HelpCircle,
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Button } from "shared/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "shared/components/ui/hover-card";
import { Badge } from "shared/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "shared/components/ui/avatar"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "shared/components/ui/sidebar"

import { useAuth } from '@/shared/auth'
import { useUser } from "shared/hooks/use-user";
import { useToast } from "shared/hooks/use-toast";
import { NotificationsDrawer } from "@/slices/profile/components/drawers/notifications-drawer";
import { MessagesDrawer } from "@/slices/profile/components/drawers/messages-drawer";
import { PrivacyDrawer } from "@/slices/profile/components/drawers/privacy-drawer";
import { HelpDrawer } from "@/slices/profile/components/drawers/help-drawer";
import { UserData, Plan } from "shared/types/User";

export function NavUser() {
  const { user } = useUser();
  const { toast } = useToast();
  const { isMobile } = useSidebar()
  const { logout } = useAuth();

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You will be redirected to the login page.",
    });
    logout();
  };

  if (!user) return null;

  const currentUserData: Partial<UserData> = {
    name: user.name || "Anonymous User",
    email: user.email || "No email",
    avatar: user.avatar,
    role: user.role,
    plan: Plan.PRO,
  };


  const handleKeyboardShortcuts = () => {
    toast({
      title: "Keyboard Shortcuts",
      description: "Press '?' to view all keyboard shortcuts",
    });
  };

  const openDrawer = (drawerId: string) => {
    document
      .querySelector<HTMLButtonElement>(`[data-drawer-trigger="${drawerId}"]`)
      ?.click();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserSettingsSheet />
        <ProfileDrawer />
        <NotificationsDrawer />
        <MessagesDrawer />
        <PrivacyDrawer />
        <HelpDrawer />
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-8 w-8">
                {currentUserData.avatar && <AvatarImage src={currentUserData.avatar} alt={currentUserData.name} />}
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </HoverCardTrigger>
        </HoverCard>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-8 w-8">
                {currentUserData.avatar && <AvatarImage src={currentUserData.avatar} alt={currentUserData.name} />}
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
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
                  {currentUserData.avatar && <AvatarImage src={currentUserData.avatar} alt={currentUserData.name} />}
                  <AvatarFallback className="rounded-lg bg-primary/10">
                    {currentUserData.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{currentUserData.name || 'User'}</span>
                  <span className="truncate text-xs">{currentUserData.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => openDrawer("profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDrawer("notifications")}>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDrawer("messages")}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Messages</span>
              <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDrawer("privacy")}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Privacy</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
            <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleKeyboardShortcuts()}>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>?</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openDrawer("help")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
