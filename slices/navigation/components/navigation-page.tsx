'use client';

import { PageHeader } from 'shared/components/pages/page-header';
import { NavigationEditor } from './navigation-editor';
import { NavigationPermissions } from './navigation-permissions';
import { ErrorPage } from 'shared/components/pages/error-page';
import { useAuth } from 'shared/hooks/useAuth';
import { RoleType } from 'shared/permission/types/rbac-types';
import { Settings } from 'lucide-react';

export function NavigationPage() {
  const { user } = useAuth();

  // Only show permissions management for admin role
  const showPermissions = user?.role === RoleType.ADMIN;

  if (!showPermissions) {
    return <ErrorPage />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Settings}
        title="Navigation Management"
        description="Manage navigation items and permissions"
      />
      {showPermissions && <NavigationPermissions />}
      <NavigationEditor />
    </div>
  );
}