'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from 'shared/components/ui/button';
import Link from 'next/link';

interface ErrorPageProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
}

export function ErrorPage({
  title = "Access Denied",
  description = "You don't have permission to access this page.",
  showBackButton = true
}: ErrorPageProps) {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
        {showBackButton && (
          <Button asChild className="mt-6">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}