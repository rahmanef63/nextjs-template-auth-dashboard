'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getSidebarData } from '../dashboard/components/sidebar-data'

interface UserData {
  id: string
  name: string | null
  email: string | null
  role: { id: string; name: string }
  permissions: string[]
  image?: string | null
}

async function fetchUserData(): Promise<UserData> {
  const response = await fetch('/api/users/me')
  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }
  return response.json()
}

async function fetchTeams() {
  const response = await fetch('/api/teams')
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }
  return response.json()
}

async function fetchProjects() {
  const response = await fetch('/api/projects')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}

export function useSidebarData() {
  const { data: session } = useSession()
  const userData = session?.user

  // Fetch user data
  const { data: userDetails } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    enabled: !!session?.user,
  })

  // Fetch teams data
  const { data: teamsData } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    enabled: !!session?.user,
  })

  // Fetch projects data
  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    enabled: !!session?.user,
  })

  // Generate static data based on user role if available
  const staticData = userData ? getSidebarData(userData) : null

  // Merge static and dynamic data
  const sidebarData = {
    user: userData
      ? {
          name: userData.name || '',
          email: userData.email || '',
          avatar: userData.image || '',
          role: userData.role.name,
        }
      : null,
    teams: teamsData || (staticData?.teams || []),
    navMain: staticData?.navMain || [],
    projects: projectsData || staticData?.projects || [],
  }

  return sidebarData
}
