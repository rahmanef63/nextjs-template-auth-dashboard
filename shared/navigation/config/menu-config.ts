import { MenuItem } from '@/shared/navigation/types/navigation-types';
import { auditConfig } from '@/slices/audit';
import { SliceConfig } from '@/slices/types';
import { MenuSectionKey, MenuSections } from '@/shared/navigation/constants/menu-section';
import { RoleType } from '@/shared/permission/types/rbac-types';

// Registry of all slice configurations
const sliceConfigs: SliceConfig[] = [
  auditConfig
];

// Menu section mapping based on role access
const menuSectionMapping: Record<string, MenuSectionKey> = {
  dashboard: MenuSectionKey.OVERVIEW,
  playground: MenuSectionKey.FEATURES,
  models: MenuSectionKey.FEATURES,
  audit: MenuSectionKey.MANAGEMENT,
  'design-engineering': MenuSectionKey.FEATURES,
  'sales-marketing': MenuSectionKey.FEATURES,
  travel: MenuSectionKey.FEATURES,
  documentation: MenuSectionKey.RESOURCES,
  settings: MenuSectionKey.SETTINGS
};

// Helper to determine menu section based on item properties and mapping
function getMenuSection(item: MenuItem): MenuSectionKey {
  // Check explicit section mapping
  if (item.id && menuSectionMapping[item.id]) {
    return menuSectionMapping[item.id];
  }

  // Default to Other section if no mapping found
  return MenuSectionKey.OTHER;
}

// Helper to check if user has access to menu item
function hasMenuAccess(item: MenuItem, userRole: RoleType): boolean {
  // Check role-specific access in order of privilege
  switch (userRole) {
    case RoleType.SUPER_ADMIN:
      return true;
    case RoleType.ADMIN:
      return !item.superAdminOnly;
    case RoleType.POWER_USER:
      return !item.superAdminOnly && !item.adminOnly;
    case RoleType.STANDARD:
      return !item.superAdminOnly && !item.adminOnly && !item.powerUserOnly;
    case RoleType.RESTRICTED:
      return item.standardAccess === true;
    default:
      return false;
  }
}

// Helper to categorize menu items
function categorizeMenuItems(items: MenuItem[], userRole: RoleType): Record<MenuSectionKey, MenuItem[]> {
  const categories: Record<MenuSectionKey, MenuItem[]> = {
    [MenuSectionKey.OVERVIEW]: [],
    [MenuSectionKey.FEATURES]: [],
    [MenuSectionKey.MANAGEMENT]: [],
    [MenuSectionKey.SETTINGS]: [],
    [MenuSectionKey.RESOURCES]: [],
    [MenuSectionKey.OTHER]: []
  };

  items.forEach(item => {
    if (hasMenuAccess(item, userRole)) {
      const section = getMenuSection(item);
      categories[section].push(item);
    }
  });

  return categories;
}

// Get all menu items
const allMenuItems = sliceConfigs.flatMap(slice => slice.navigation || []);

// Function to get categorized items for a role
function getCategorizedItems(userRole: RoleType) {
  return categorizeMenuItems(allMenuItems, userRole);
}

// Export categorized items for admin by default
const defaultCategories = categorizeMenuItems(allMenuItems, RoleType.ADMIN);

// Export items by section with metadata
export const menuItems = allMenuItems;
export const categorizedItems = defaultCategories;
export { getCategorizedItems, MenuSections };