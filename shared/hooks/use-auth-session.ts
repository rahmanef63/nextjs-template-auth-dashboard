import { useSession } from 'next-auth/react'
import type { SessionUser } from '@/shared/auth/types/session'
import { RoleType } from '@/shared/permission/types/rbac-types'

interface UseAuthSessionReturn {
  user: SessionUser | null
  userRole: RoleType
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export function useAuthSession(): UseAuthSessionReturn {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return {
      user: null,
      userRole: RoleType.RESTRICTED,
      isLoading: true,
      isAuthenticated: false,
      error: null
    }
  }

  if (status === "unauthenticated" || !session?.user) {
    return {
      user: null,
      userRole: RoleType.RESTRICTED,
      isLoading: false,
      isAuthenticated: false,
      error: status === "unauthenticated" ? "Please sign in" : "No user data available"
    }
  }

  const user = session.user as unknown as SessionUser
  const userRole = user.role?.type || RoleType.RESTRICTED

  return {
    user,
    userRole,
    isLoading: false,
    isAuthenticated: true,
    error: null
  }
}
