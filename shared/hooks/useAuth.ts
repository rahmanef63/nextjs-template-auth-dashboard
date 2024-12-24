'use client';

import { useCallback, useEffect, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { apiClient } from 'shared/lib/apiClient';
import { API_ENDPOINTS } from 'shared/constants/endpoints';
import { ROUTES } from 'shared/constants/routes';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.users.me);
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      await fetchUser();
      router.push(ROUTES.dashboard.root);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  const register = async (data: { email: string; password: string; name: string }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.auth.register, data);
      if (response.success) {
        // After successful registration, login the user
        await login(data.email, data.password);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      // First, call our custom logout endpoint to clear server-side session
      await apiClient.post(API_ENDPOINTS.auth.logout, {});
      
      // Then use next-auth's signOut
      await signOut({ redirect: false });
      
      // Clear local state
      setUser(null);
      
      // Force reload to clear any cached state
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
}