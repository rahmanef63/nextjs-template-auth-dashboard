'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { User } from '../types/auth-types';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  login: (newSession: Session) => void;
  logout: () => void;
  loading?: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    setLoading(status === 'loading');
  }, [status]);

  const login = (newSession: Session) => {
    router.push('/dashboard');
  };

  const logout = () => {
    signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || null,
        role: session.user.role,
        avatar: session.user.image || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      } : null,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
