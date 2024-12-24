'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'shared/components/ui/button';
import { useAuth } from 'shared/hooks/useAuth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <nav className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className={pathname === '/dashboard' ? 'bg-accent' : ''}>
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="ghost" className={pathname === '/dashboard/profile' ? 'bg-accent' : ''}>
                Profile
              </Button>
            </Link>
          </nav>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}