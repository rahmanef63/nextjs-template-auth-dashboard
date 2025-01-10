'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import type { User } from '../types/auth-types';

export interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Export hook for easy context usage
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (status === 'authenticated' && session?.user) {
      const sessionUser = session.user;
      const fullUser: User = {
        id: sessionUser.id,
        email: sessionUser.email || '',
        name: sessionUser.name || '',
        role: sessionUser.role,
        roleType: sessionUser.roleType,
        avatar: sessionUser.image ?? undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUser(fullUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [status, session]);

  const login = () => {
    router.push('/dashboard');
  };

  const logout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}
