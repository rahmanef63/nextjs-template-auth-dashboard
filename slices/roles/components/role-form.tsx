'use client';

import { useState } from 'react';
import { Role, RoleType } from 'shared/permission/types/rbac-types';
import { DEFAULT_PERMISSIONS } from 'shared/storage/constants/roles-storage-constants';
import { Button } from 'shared/components/ui/button';
import { Input } from 'shared/components/ui/input';
import { Label } from 'shared/components/ui/label';
import { Textarea } from 'shared/components/ui/textarea';
import { useToast } from 'shared/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/components/ui/select';

interface RoleFormProps {
  role?: Role;
  onSubmit: (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function RoleForm({ role, onSubmit }: RoleFormProps) {
  const [name, setName] = useState(role?.name || '');
  const [type, setType] = useState<RoleType>(role?.type || RoleType.CUSTOM);
  const [description, setDescription] = useState(role?.description || '');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Role name is required',
        variant: 'destructive',
      });
      return;
    }

    onSubmit({
      name: name.trim(),
      type,
      description: description.trim(),
      permissions: role?.permissions || DEFAULT_PERMISSIONS,
      isSystem: false,
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
          disabled={role?.isSystem}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Role Type</Label>
        <Select
          value={type}
          onValueChange={(value) => setType(value as RoleType)}
          disabled={role?.isSystem}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select role type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RoleType.ADMIN}>Administrator</SelectItem>
            <SelectItem value={RoleType.MANAGER}>Manager</SelectItem>
            <SelectItem value={RoleType.STAFF}>Staff</SelectItem>
            <SelectItem value={RoleType.CLIENT}>Client</SelectItem>
            <SelectItem value={RoleType.CUSTOM}>Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter role description"
          disabled={role?.isSystem}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={role?.isSystem}>
          {role ? 'Update' : 'Create'} Role
        </Button>
      </div>
    </form>
  );
}