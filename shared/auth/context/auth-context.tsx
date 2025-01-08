'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { User } from '../types/next-auth';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  login: (newSession: Session) => void;
  logout: () => void;
  loading?: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
      user: session?.user ?? null,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
