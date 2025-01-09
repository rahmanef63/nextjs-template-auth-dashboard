import { apiClient } from 'shared/lib/apiClient';
import { ApiAuthResponse, AuthFormData } from 'shared/auth/types';

export async function loginUser(email: string, password: string): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiAuthResponse>('/api/auth/login', {
    email,
    password,
  });
  return response.data!;
}

export async function registerUser(data: AuthFormData): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiAuthResponse>('/api/auth/register', data);
  return response.data!;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post('/api/auth/logout', {});
}