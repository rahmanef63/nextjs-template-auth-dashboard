'use client';

import { useState } from 'react';
import { Role } from 'shared/types';
import { getRoles, createRole, updateRole, deleteRole } from 'shared/roles/storage';
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

export function RoleManager() {
  const [roles, setRoles] = useState<Role[]>(getRoles());
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const { toast } = useToast();

  const handleCreateRole = (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newRole = createRole(data);
      setRoles(getRoles());
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

  const handleUpdateRole = (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedRole) return;

    try {
      updateRole(selectedRole.id, data);
      setRoles(getRoles());
      setSelectedRole(null);
      setIsFormOpen(false);
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
    if (!roleToDelete) return;

    try {
      deleteRole(roleToDelete.id);
      setRoles(getRoles());
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
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Roles</h2>
        <Button onClick={() => {
          setSelectedRole(null);
          setIsFormOpen(true);
        }}>
          Create Role
        </Button>
      </div>

      <RoleList
        roles={roles}
        onEdit={(role) => {
          setSelectedRole(role);
          setIsFormOpen(true);
        }}
        onDelete={setRoleToDelete}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? 'Edit Role' : 'Create Role'}
            </DialogTitle>
          </DialogHeader>
          <RoleForm
            role={selectedRole || undefined}
            onSubmit={selectedRole ? handleUpdateRole : handleCreateRole}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}