'use client';

import { useState } from 'react';
import { Role, RoleType } from 'shared/types';
import { DEFAULT_PERMISSIONS } from 'shared/storage/constants/roles-storage-constants';
import { Button } from 'shared/components/ui/button';
import { Input } from 'shared/components/ui/input';
import { Label } from 'shared/components/ui/label';
import { Textarea } from 'shared/components/ui/textarea';
import { useToast } from 'shared/hooks/use-toast';

interface RoleFormProps {
  role?: Role;
  onSubmit: (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [name, setName] = useState(role?.name || '');
  const [description, setDescription] = useState(role?.description || '');
  const [selectedPermissions, setSelectedPermissions] = useState(role?.permissions || DEFAULT_PERMISSIONS);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      name,
      description,
      type: RoleType.CUSTOM,
      permissions: selectedPermissions,
      isSystem: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter role name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter role description"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {role ? 'Update Role' : 'Create Role'}
        </Button>
      </div>
    </form>
  );
}