import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  title?: string;
  message?: string;
}

export function ErrorPage({ 
  title = "Access Denied", 
  message = "You don't have permission to access this page." 
}: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
