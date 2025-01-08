import { apiClient } from 'shared/lib/apiClient';
import { LoginResponse, RegisterResponse } from 'shared/auth/types';

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', {
    email,
    password,
  });
  return response.data!;
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>('/api/auth/register', data);
  return response.data!;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post('/api/auth/logout', {});
}