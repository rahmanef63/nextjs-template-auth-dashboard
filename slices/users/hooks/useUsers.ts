'use client';

import { useState, useEffect } from 'react';
import { UserFilters, UserListResponse } from '../types';
import { fetchUsers } from '../lib/api';

export function useUsers(initialFilters: UserFilters = {}) {
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [data, setData] = useState<UserListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        const response = await fetchUsers(filters);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [filters]);

  return {
    users: data?.users ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    setFilters,
  };
}