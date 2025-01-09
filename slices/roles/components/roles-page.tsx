'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Shield } from 'lucide-react';
import { RoleManager } from './role-manager';
import { RoleActivityLog } from './role-activity-log';
import { ErrorPage } from 'shared/components/pages/error-page';
import { useAuth } from 'shared/hooks/';
import { getRoles, assignRole } from 'shared/storage/lib/roles-storage';
import { useState, useEffect } from 'react';
import { Role, RoleType } from 'shared/permission/types/rbac-types';
import { User } from 'shared/auth/types/auth-types';

export function RolesPage() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = () => {
      const allRoles = getRoles();
      setRoles(allRoles);
    };

    loadRoles();
  }, []);

  const handleRoleUpdate = async (userId: string, role: Role) => {
    try {
      assignRole(userId, role.id);
      setRoles(getRoles());
      return true;
    } catch (error) {
      console.error('Error updating role:', error);
      return false;
    }
  };

  if (user?.role !== RoleType.ADMIN) {
    return <ErrorPage />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Shield}
        title="Role Management"
        description="Create and manage system roles"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <RoleManager 
            roles={roles}
            onRoleUpdate={handleRoleUpdate}
          />
        </div>
        <div>
          <RoleActivityLog />
        </div>
      </div>
    </div>
  );
}