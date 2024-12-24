import { apiClient } from 'shared/lib/apiClient';
import { UserFilters, UserListResponse, User } from '../types';

export async function fetchUsers(filters: UserFilters): Promise<UserListResponse> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = await apiClient.get<UserListResponse>(`/api/users?${queryParams}`);
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch users');
  }
  return response.data!;
}

export async function updateUserStatus(userId: string, status: 'active' | 'inactive') {
  const response = await apiClient.put<User>(`/api/users/${userId}/status`, { status });
  if (!response.success) {
    throw new Error(response.error || 'Failed to update user status');
  }
  return response.data!;
}