import { useMemo } from "react"
import { useSession } from "next-auth/react"
import { 
  ADMIN_MENU_ITEMS, 
  MANAGER_MENU_ITEMS, 
  CORE_MENU_ITEMS 
} from "shared/navigation"
import { RoleType } from "shared/permission/types"
import { MenuItem } from "shared/navigation/types"

export function useNavigationItems(): MenuItem[] {
  const { data: session } = useSession()
  
  return useMemo(() => {
    if (!session?.user?.role?.type) {
      return CORE_MENU_ITEMS
    }

    const userRole = session.user.role.type as RoleType
    switch (userRole) {
      case "ADMIN":
        return ADMIN_MENU_ITEMS
      case "MANAGER":
        return MANAGER_MENU_ITEMS
      default:
        return CORE_MENU_ITEMS
    }
  }, [session?.user?.role?.type])
}
