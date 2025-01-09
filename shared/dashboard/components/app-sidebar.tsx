"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "shared/components/ui/sidebar"
import { useSidebarData } from "shared/hooks/useSidebarData"
import { SidebarSkeleton } from "./sidebar-skeleton"
import { TeamSwitcher } from "./team-switcher"
import { getSidebarData } from "./sidebar-data"
import { useSession } from "next-auth/react"
import { RoleType } from "shared/types"
import { UserProfile } from "@/slices/profile/components/user-profile"
import { SidebarNavMain } from "./sidebar-nav-main"

interface SessionUser {
  id: string
  name: string | null
  email: string
  role: {
    id: string
    name: string
    type: RoleType
  }
  permissions: string[]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const { data: session, status } = useSession()
  const [error, setError] = React.useState<string | null>(null)
  const sidebarData = useSidebarData()

  if (status === "loading") {
    return <SidebarSkeleton />
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Please sign in</p>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No user data available</p>
      </div>
    )
  }

  const userData: SessionUser = {
    id: session.user.id,
    name: session.user.name || null,
    email: session.user.email,
    role: {
      id: session.user.role.id,
      name: session.user.role.name,
      type: session.user.role.type as RoleType
    },
    permissions: session.user.permissions
  }

  const data = getSidebarData(userData)

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon"
      className="border-r transition-all duration-200 ease-in-out"
      {...props}
    >
      <SidebarHeader className="border-b px-2 py-2">
        <TeamSwitcher teams={[data.teams[0]]} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        {/* <NavMain />
        <NavProjects projects={data.projects} /> */}
        <SidebarNavMain role={userData.role.type} />
      </SidebarContent>
      <SidebarFooter className="border-t px-2 py-2">
        {/* <NavUser userData={data.user} /> */}
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
