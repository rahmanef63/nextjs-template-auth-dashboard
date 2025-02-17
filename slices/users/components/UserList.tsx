'use client';

import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserFilters } from '../types';
import { Input } from 'shared/components/ui/input';
import { Button } from 'shared/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/components/ui/select';
import { Table, TableHeader, TableRow, TableCell, TableBody } from 'shared/components/ui/table';
import { RoleType } from 'shared/permission/types/rbac-types';

export function UserList() {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
  });

  const { users, isLoading, total, page, totalPages, setFilters: updateFilters } = useUsers(filters);

  const handleSearch = (search: string) => {
    updateFilters({ ...filters, search, page: 1 });
  };

  const handleRoleFilter = (role: string) => {
    updateFilters({ ...filters, role, page: 1 });
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search users..."
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={handleRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RoleType.SUPER_ADMIN}>Super Admin</SelectItem>
            <SelectItem value={RoleType.ADMIN}>Admin</SelectItem>
            <SelectItem value={RoleType.POWER_USER}>Power User</SelectItem>
            <SelectItem value={RoleType.STANDARD}>Standard</SelectItem>
            <SelectItem value={RoleType.RESTRICTED}>Restricted</SelectItem>
            <SelectItem value={RoleType.CUSTOM}>Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <div>
          Showing {users.length} of {total} users
        </div>
        <div className="flex gap-2">
          <Button
            disabled={page === 1}
            onClick={() => updateFilters({ ...filters, page: page - 1 })}
          >
            Previous
          </Button>
          <Button
            disabled={page === totalPages}
            onClick={() => updateFilters({ ...filters, page: page + 1 })}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}