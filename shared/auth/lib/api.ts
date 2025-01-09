import { apiClient } from 'shared/lib/apiClient';
import { ApiAuthResponse, AuthFormData } from 'shared/auth/types';

interface LoginRequest extends Record<string, unknown> {
  email: string;
  password: string;
}

interface RegisterRequest extends Record<string, unknown> {
  data: AuthFormData;
}

interface LogoutRequest extends Record<string, unknown> {
  data: Record<string, never>;
}

export async function loginUser(email: string, password: string): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiAuthResponse, LoginRequest>('/api/auth/login', {
    email,
    password,
  });
  return response.data!;
}

export async function registerUser(data: AuthFormData): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiAuthResponse, RegisterRequest>('/api/auth/register', { data });
  return response.data!;
}

export async function logoutUser(): Promise<void> {
  await apiClient.post<void, LogoutRequest>('/api/auth/logout', { data: {} });
}