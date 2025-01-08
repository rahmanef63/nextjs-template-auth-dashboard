export type PermissionAction = 'read' | 'write' | 'delete' | 'update';

export type Permission = `${string}:${PermissionAction}`;

export interface PermissionDescriptor {
  id: string;
  name: Permission;
}

export type UserPermissions = Permission[];
