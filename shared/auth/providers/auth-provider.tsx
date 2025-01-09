'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import type { User } from '../types/auth-types';
import { AuthContext } from '../context/auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (status === 'authenticated' && session?.user) {
      // Convert session user to User
      const fullUser: User = {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || null,
        role: session.user.role,
        avatar: session.user.image || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUser(fullUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
