import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Permission, Role, RoleType } from '../types';

interface RBACState {
  currentRole: Role | null;
  permissions: Permission[];
  roles: Role[];
  setCurrentRole: (role: Role) => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (roleType: RoleType) => boolean;
}

export const useRBACStore = create<RBACState>()(
  persist(
    (set, get) => ({
      currentRole: null,
      permissions: [],
      roles: [],
      setCurrentRole: (role: Role) => set({ 
        currentRole: role,
        permissions: role.permissions 
      }),
      hasPermission: (permission: Permission) => {
        const { permissions } = get();
        return permissions.includes(permission);
      },
      hasRole: (roleType: RoleType) => {
        const { currentRole } = get();
        return currentRole?.type === roleType;
      },
    }),
    {
      name: 'rbac-storage',
    }
  )
);