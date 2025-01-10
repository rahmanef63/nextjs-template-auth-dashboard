import { Role, RoleType } from '@/shared/permission/types/rbac-types';
import { Permission, PermissionAction, createPermission, isRestricted } from '@/shared/permission/types/permission-types';

export class PermissionManager {
  // Check if user has access (not restricted)
  static hasAccess(role: Role, resource: string, action: PermissionAction): boolean {
    // Admin always has access to everything
    if (role.type === RoleType.ADMIN) return true;
    
    // Check if this permission is restricted
    return !isRestricted(role.restrictions, resource, action);
  }

  // Add a restriction to a role
  static addRestriction(role: Role, resource: string, action: PermissionAction): Role {
    const restriction = createPermission(resource, action);
    const restrictions = role.restrictions || [];
    
    if (!restrictions.includes(restriction)) {
      return {
        ...role,
        restrictions: [...restrictions, restriction]
      };
    }
    
    return role;
  }

  // Remove a restriction from a role
  static removeRestriction(role: Role, resource: string, action: PermissionAction): Role {
    if (!role.restrictions) return role;

    const restriction = createPermission(resource, action);
    return {
      ...role,
      restrictions: role.restrictions.filter(p => p !== restriction)
    };
  }

  // Get all restrictions for a role
  static getRestrictions(role: Role): Permission[] {
    return role.restrictions || [];
  }

  // Clear all restrictions for a role
  static clearRestrictions(role: Role): Role {
    return {
      ...role,
      restrictions: []
    };
  }
}
