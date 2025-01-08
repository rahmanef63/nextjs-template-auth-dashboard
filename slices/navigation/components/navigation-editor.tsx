'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/components/ui/card';
import { Button } from 'shared/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/components/ui/select';
import { Role, RoleType } from 'shared/permission/types/rbac-types';
import { MENU_ITEMS } from 'shared/navigation';
import { getRoleMenus, setRoleMenus, resetRoleMenus } from 'shared/storage/lib/navigation-storage';
import { getRoles } from 'shared/storage/lib/';
import { useToast } from 'shared/hooks/use-toast';

export function NavigationEditor() {
  const [selectedRole, setSelectedRole] = useState<Role>({
    id: 'admin',
    name: 'Administrator',
    type: RoleType.ADMIN,
    description: 'System administrator',
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [roles, setRoles] = useState(getRoles());
  const { toast } = useToast();

  useEffect(() => {
    const menuIds = getRoleMenus(selectedRole);
    setSelectedMenus(menuIds);
  }, [selectedRole]);

  const handleRoleChange = (roleType: string) => {
    const role = roles.find(r => r.type === roleType) || selectedRole;
    setSelectedRole(role);
  };

  const handleMenuToggle = (menuId: string) => {
    setSelectedMenus(current => 
      current.includes(menuId)
        ? current.filter(id => id !== menuId)
        : [...current, menuId]
    );
  };

  const handleSave = () => {
    setRoleMenus(selectedRole, selectedMenus);
    toast({
      title: 'Success',
      description: 'Navigation menu updated successfully',
    });
  };

  const handleReset = () => {
    resetRoleMenus(selectedRole);
    const defaultMenus = getRoleMenus(selectedRole);
    setSelectedMenus(defaultMenus);
    toast({
      title: 'Success',
      description: 'Navigation menu reset to defaults',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Menu Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Role</label>
          <Select value={selectedRole.type} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.type}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Menu Items</label>
          <div className="grid gap-2">
            {MENU_ITEMS.map((item) => {
              const isSelected = selectedMenus.includes(item.id);
              
              return (
                <Button
                  key={item.id}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleMenuToggle(item.id)}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}