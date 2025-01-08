'use client';

import { AuthGuard } from '@/shared/auth/guards/auth-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-background">
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}