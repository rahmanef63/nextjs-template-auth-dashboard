'use client';

import { useState } from 'react';
import { Role } from 'shared/permission/types/rbac-types';
import { getRoles, createRole, updateRole, deleteRole } from 'shared/storage/lib/roles-storage';
import { Button } from 'shared/components/ui/button';
import { RoleList } from './role-list';
import { RoleForm } from './role-form';
import { useToast } from 'shared/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'shared/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared/components/ui/alert-dialog';

interface RoleManagerProps {
  roles: Role[];
  onRoleUpdate: (userId: string, role: Role) => Promise<boolean>;
}

export function RoleManager({ roles, onRoleUpdate }: RoleManagerProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const { toast } = useToast();

  const handleCreateRole = (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newRole = createRole(data);
      onRoleUpdate('', newRole);
      setIsFormOpen(false);
      toast({
        title: 'Success',
        description: 'Role created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create role',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateRole = (id: string, data: Partial<Role>) => {
    try {
      const updatedRole = updateRole(id, data);
      onRoleUpdate('', updatedRole);
      setSelectedRole(null);
      toast({
        title: 'Success',
        description: 'Role updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update role',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteRole = () => {
    if (roleToDelete) {
      try {
        deleteRole(roleToDelete.id);
        onRoleUpdate('', roleToDelete);
        setRoleToDelete(null);
        toast({
          title: 'Success',
          description: 'Role deleted successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to delete role',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Roles</h2>
        <Button onClick={() => setIsFormOpen(true)}>Create Role</Button>
      </div>

      <RoleList
        roles={roles}
        onEdit={setSelectedRole}
        onDelete={setRoleToDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Role</DialogTitle>
          </DialogHeader>
          <RoleForm onSubmit={handleCreateRole} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <RoleForm
              role={selectedRole}
              onSubmit={(data) => handleUpdateRole(selectedRole.id, data)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the role
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}