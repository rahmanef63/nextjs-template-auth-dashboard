'use client';

import { useAuth } from 'shared/hooks/useAuth';
import { redirect } from 'next/navigation';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user?.role !== 'MANAGER') {
    redirect('/dashboard');
  }

  return <>{children}</>;
}