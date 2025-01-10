'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getSidebarData } from '../dashboard/components/sidebar-data'
import { NavigationSection, MenuItem } from '../navigation/types'
import type { SidebarUser } from '../dashboard/components/sidebar-data'

interface UserProfile {
  name: string
  email: string
  avatar?: string
  role: string
}

interface SidebarState {
  user: UserProfile | null
  items: MenuItem[]
  sections: NavigationSection[]
}

export function useSidebarData(): SidebarState {
  const { data: session } = useSession()
  const userData = session?.user as SidebarUser | undefined

  // Generate navigation data based on user role if available
  const sidebarData = userData ? getSidebarData(userData) : { items: [] }

  return {
    user: userData
      ? {
          name: userData.name || '',
          email: userData.email || '',
          avatar: userData.image || '',
          role: userData.role.name,
        }
      : null,
    items: sidebarData.items,
    sections: []  // We can populate this from menu-config if needed
  }
}
