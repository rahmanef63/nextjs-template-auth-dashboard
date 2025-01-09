'use client';

import { useCallback } from 'react';
import { Permission, PERMISSIONS } from 'shared/permission/types/permission-types';
import { FeatureId } from 'shared/navigation/types';
import { useNavigationPermissions } from '../store/navigation-permissions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Button } from 'shared/components/ui/button';

const permissionOptions = [
  PERMISSIONS.USERS.READ,
  PERMISSIONS.USERS.WRITE,
  PERMISSIONS.USERS.MANAGE
];

export function NavigationPermissions() {
  const { permissions, updatePermissions } = useNavigationPermissions();

  const setPermissions = useCallback((permissions: Record<FeatureId, Permission>) => {
    updatePermissions(permissions);
  }, [updatePermissions]);

  const handlePermissionChange = useCallback((featureId: FeatureId, permission: Permission) => {
    setPermissions({
      ...permissions,
      [featureId]: permission
    });
  }, [permissions, setPermissions]);

  const grantAllPermissions = useCallback(() => {
    const allWritePermissions = Object.keys(permissions).reduce((acc, featureId) => ({
      ...acc,
      [featureId]: PERMISSIONS.USERS.WRITE
    }), {});
    setPermissions(allWritePermissions as Record<FeatureId, Permission>);
  }, [permissions, setPermissions]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Navigation Permissions</CardTitle>
          <Button onClick={grantAllPermissions}>Grant All Permissions</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(permissions).map(([featureId, permission]) => (
          <div key={featureId} className="flex items-center justify-between">
            <span className="text-sm font-medium">{featureId}</span>
            <Select
              value={permission}
              onValueChange={(value) => handlePermissionChange(featureId as FeatureId, value as Permission)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>
              <SelectContent>
                {permissionOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
