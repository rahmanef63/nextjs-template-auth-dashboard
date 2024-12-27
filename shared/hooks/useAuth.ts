'use client';

import { useCallback } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'shared/constants/routes';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

      return result;
    } catch (err) {
      throw err;
    }
  };

  const register = async (data: { email: string; password: string; name: string }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // After successful registration, log the user in
      return login(data.email, data.password);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push(ROUTES.auth.login);
    } catch (err) {
      throw err;
    }
  };

  return {
    user: session?.user ?? null,
    loading: status === 'loading',
    login,
    register,
    logout,
  };
}