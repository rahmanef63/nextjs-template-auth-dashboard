'use client';

import { useAuth } from 'shared/hooks/useAuth';
import { redirect } from 'next/navigation';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user?.role !== 'STAFF') {
    redirect('/dashboard');
  }

  return <>{children}</>;
}