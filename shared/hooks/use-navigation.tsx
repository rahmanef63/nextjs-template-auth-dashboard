import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  NavItem,
  MenuItem,
  NavigationSection,
  NavigationStore,
} from '../navigation/types/navigation-types';
import { adminMenuItems, defaultMenuItems } from '../navigation/config/menu-config';

type RoleMenus = {
  [key: string]: NavigationSection[];
};

const navigationData = {
  roleMenus: {
    construction: [
      {
        title: 'Main',
        items: defaultMenuItems
      },
      {
        title: 'Administration',
        items: adminMenuItems
      }
    ]
  } as RoleMenus
};

export const useNavigation = create<NavigationStore>()(
  persist(
    (set, get) => ({
      activeRole: 'construction',
      pathname: undefined,
      setActiveRole: (role) => {
        set({ activeRole: role });
      },
      getMenuForRole: () => {
        const { activeRole } = get();
        return navigationData.roleMenus[activeRole] || [];
      },
      canAccessRoute: (path: string) => {
        const { activeRole } = get();
        const menuItems = navigationData.roleMenus[activeRole] || [];
        
        // Common routes are always accessible
        const commonRoutes = ['dashboard', 'profile', 'notifications', 'settings'];
        const pathParts = path.split('/').filter(Boolean);
        
        // Handle root path
        if (path === '/') return true;
        
        // If no role in path, allow access to root
        if (pathParts.length === 0) return true;
        
        // If the path starts with a role, check if it matches the active role
        if (pathParts[0] !== activeRole) return false;
        
        // If it's just the role path (e.g., /designer), allow it
        if (pathParts.length === 1) return true;
        
        // Check if it's a common route
        if (commonRoutes.includes(pathParts[1])) return true;
        
        // Check if the route exists in the role's menu items
        return menuItems.some((section: NavigationSection) => 
          section.items.some((item: MenuItem) => {
            const itemPath = item.path.startsWith('/') 
              ? item.path.slice(1) 
              : item.path;
            return pathParts.join('/') === itemPath;
          })
        );
      },
    }),
    {
      name: 'navigation-storage',
    }
  )
);