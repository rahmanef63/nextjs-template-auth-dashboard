import { useMemo } from "react"
import { useSession } from "next-auth/react"
import { 
  adminMenuItems,
  managementMenuItems,
  staffMenuItems,
  guestMenuItems
} from "shared/navigation/config/menu-config"
import { RoleType } from "shared/permission/types"
import { MenuItem } from "shared/navigation/types"

export function useNavigationItems(): MenuItem[] {
  const { data: session } = useSession()
  
  return useMemo(() => {
    if (!session?.user?.role?.type) {
      return guestMenuItems
    }

    const userRole = session.user.role.type as RoleType
    switch (userRole) {
      case "ADMIN":
        return adminMenuItems
      case "MANAGER":
        return managementMenuItems
      default:
        return guestMenuItems
    }
  }, [session?.user?.role?.type])
}
