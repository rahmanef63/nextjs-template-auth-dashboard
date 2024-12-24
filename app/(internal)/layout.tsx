'use client';

import { useAuth } from 'shared/hooks/useAuth';
import { NotificationCenter } from 'shared/components/notifications/NotificationCenter';
import { ThemeProvider } from '@/shared/components/layout/theme-provider';

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <span className="text-sm text-muted-foreground">
                {user.name || user.email}
              </span>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}