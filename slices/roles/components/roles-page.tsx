'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { Shield } from 'lucide-react';
import { RoleManager } from 'shared/components/devtools/role-manager';
import { RoleActivityLog } from 'shared/components/roles/role-activity-log';
import { ErrorPage } from 'shared/components/pages/error-page';
import { useAuth } from 'shared/auth/contexts/auth-context';
import { getAllUsers, updateUserRole } from 'shared/auth/utils/auth-utils';
import { useState, useEffect } from 'react';
import { User } from 'shared/auth/types';
import { Role } from 'shared/roles/types/role-types';

export function RolesPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<Omit<User, 'password'>[]>([]);

  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getAllUsers();
      setUsers(allUsers);
    };

    loadUsers();
  }, []);

  const handleRoleUpdate = async (userId: string, role: Role) => {
    const success = updateUserRole(userId, role);
    if (success) {
      setUsers(getAllUsers());
    }
  };

  if (user?.role !== 'administrator') {
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
            users={users}
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