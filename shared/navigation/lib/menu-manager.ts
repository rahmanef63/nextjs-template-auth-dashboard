import { MenuItem } from '../types';
import { adminItems, managementItems, operationalItems, generalItems } from '../config/menu-config';
import { RoleType } from '@/shared/permission/types/rbac-types';
import { MenuSection } from '../constants/menu-section';

/**
 * Menu Manager Class
 * Handles the dynamic management of navigation menu items
 */
export class MenuManager {
  private static instance: MenuManager;
  private customMenuItems: Map<RoleType, MenuItem[]>;

  private constructor() {
    this.customMenuItems = new Map();
    this.initializeDefaultMenus();
  }

  public static getInstance(): MenuManager {
    if (!MenuManager.instance) {
      MenuManager.instance = new MenuManager();
    }
    return MenuManager.instance;
  }

  private initializeDefaultMenus() {
    // Initialize admin menus with all sections
    const allMenus = [
      ...(adminItems || []),
      ...(managementItems || []),
      ...(operationalItems || []),
      ...(generalItems || [])
    ];

    // Super admin and admin get all menus
    this.customMenuItems.set(RoleType.SUPER_ADMIN, allMenus);
    this.customMenuItems.set(RoleType.ADMIN, allMenus);

    // Power users get management, operational and general items
    this.customMenuItems.set(RoleType.POWER_USER, [
      ...(managementItems || []),
      ...(operationalItems || []),
      ...(generalItems || [])
    ]);

    // Standard users get operational and general items
    this.customMenuItems.set(RoleType.STANDARD, [
      ...(operationalItems || []),
      ...(generalItems || [])
    ]);

    // Restricted users only get general items
    this.customMenuItems.set(RoleType.RESTRICTED, [
      ...(generalItems || [])
    ]);

    // Custom roles start with general items
    this.customMenuItems.set(RoleType.CUSTOM, [
      ...(generalItems || [])
    ]);
  }

  /**
   * Get menu items for a specific role
   */
  public getMenuItems(role: RoleType): MenuItem[] {
    // Super admin and admin get all menus
    if (role === RoleType.SUPER_ADMIN || role === RoleType.ADMIN) {
      return [
        ...(adminItems || []),
        ...(managementItems || []),
        ...(operationalItems || []),
        ...(generalItems || [])
      ];
    }

    return this.customMenuItems.get(role) || [];
  }

  /**
   * Add custom menu items for a role
   */
  public addMenuItems(role: RoleType, items: MenuItem[]): void {
    const existingItems = this.customMenuItems.get(role) || [];
    this.customMenuItems.set(role, [...existingItems, ...items]);
  }

  /**
   * Remove menu items for a role
   */
  public removeMenuItems(role: RoleType, itemIds: string[]): void {
    const existingItems = this.customMenuItems.get(role) || [];
    const filteredItems = existingItems.filter(item => !itemIds.includes(item.id));
    this.customMenuItems.set(role, filteredItems);
  }

  /**
   * Clear all menu items for a role
   */
  public clearMenuItems(role: RoleType): void {
    this.customMenuItems.delete(role);
  }
}

// Export a singleton instance
export const menuManager = MenuManager.getInstance();
