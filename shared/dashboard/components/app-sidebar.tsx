"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/shared/components/ui/sidebar"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Users } from "lucide-react"
import { TeamSwitcher } from "./team-switcher"
import { UserProfile } from "@/slices/profile/components/user-profile"
import { SidebarNavMain } from "./sidebar-nav-main"
import { useAuthSession } from "@/shared/hooks/use-auth-session"
import { MenuSectionKey, MenuSections } from '@/shared/navigation/constants/menu-section';
import { getCategorizedItems } from '@/shared/navigation/config/menu-config';

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: SidebarProps) {
  const { isLoading, isAuthenticated, error, userRole } = useAuthSession()
  const categorizedItems = getCategorizedItems(userRole);
  
  // Define the order of sections
  const sections: MenuSectionKey[] = [
    MenuSectionKey.OVERVIEW,
    MenuSectionKey.FEATURES,
    MenuSectionKey.MANAGEMENT,
    MenuSectionKey.SETTINGS,
    MenuSectionKey.RESOURCES,
    MenuSectionKey.OTHER
  ];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon"
      className="border-r transition-all duration-200 ease-in-out"
      {...props}
    >
      <SidebarHeader className="border-b px-2 py-2">
        <TeamSwitcher teams={[
          {
            name: "Personal Account",
            logo: Users,
            plan: "Free"
          }
        ]} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <ScrollArea className="h-full">
          <SidebarContent>
            {sections.map((section) => {
              const items = categorizedItems[section];
              return items.length > 0 && (
                <SidebarGroup key={section}>
                  <SidebarGroupLabel>
                    {MenuSections[section].title}
                  </SidebarGroupLabel>
                  <SidebarNavMain items={items} />
                </SidebarGroup>
              );
            })}
          </SidebarContent>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t px-2 py-2">
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
