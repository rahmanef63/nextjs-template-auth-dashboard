'use client';

import { ReactNode } from 'react';
import { useAuth } from 'shared/hooks/useAuth';
import { redirect } from 'next/navigation';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (requireAuth && !user) {
    redirect(redirectTo);
  }

  if (!requireAuth && user) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}