import { 
  RoleType,
  MenuItem
 } from 'shared/types';
import { fetchRoleMenus } from 'shared/permission/config/menu-config';

// Function to get menus for a specific role
export async function getRoleMenus(role: RoleType): Promise<MenuItem[]> {
  return fetchRoleMenus(role);
}

// Function to get all role menus
export async function getAllRoleMenus(): Promise<Record<RoleType, MenuItem[]>> {
  const roles = Object.values(RoleType);
  const menuPromises = roles.map(async role => ({
    role,
    menus: await fetchRoleMenus(role)
  }));

  const menuResults = await Promise.all(menuPromises);
  return menuResults.reduce((acc, { role, menus }) => ({
    ...acc,
    [role]: menus
  }), {} as Record<RoleType, MenuItem[]>);
}
