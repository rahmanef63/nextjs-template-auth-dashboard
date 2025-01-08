"use client"

import { Avatar, AvatarFallback, AvatarImage } from "shared/components/ui/avatar";
import { useAuth } from "shared/hooks/useAuth";
import { useSidebar } from "shared/components/ui/sidebar";
import { useToast } from "shared/hooks/use-toast";
import { Button } from "shared/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "shared/components/ui/hover-card";
import { Badge } from "shared/components/ui/badge";
import { SidebarMenuButton } from "@/shared/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, DropdownMenuGroup } from "shared/components/ui/dropdown-menu";
import { Settings, User, LogOut, Bell, Mail, Shield, Keyboard, HelpCircle } from "lucide-react";
import { SettingsDrawer, ProfileDrawer, NotificationsDrawer, MessagesDrawer, PrivacyDrawer, HelpDrawer } from "./drawers";
import { useState, useEffect } from 'react';

export function UserProfile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { state } = useSidebar();

  // Close dropdown when sidebar collapses
  useEffect(() => {
    if (state === "collapsed") {
      setOpen(false);
    }
  }, [state]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logging out...",
        description: "You will be redirected to the login page.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
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
    <>
      <SettingsDrawer />
      <MessagesDrawer />
      <PrivacyDrawer />
      <HelpDrawer />
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <HoverCard>
          <HoverCardTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[280px] p-4"
            side="right"
          >
            <div className="flex justify-between space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{user.name || "User"}</h4>
                <div className="flex items-center pt-2">
                  <Badge variant="secondary" className="text-xs">
                    Member
                  </Badge>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <DropdownMenuContent className="w-72" align="end" side="right">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
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
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => openDrawer("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDrawer("privacy")}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Privacy</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleKeyboardShortcuts}>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>?</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => openDrawer("help")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}