import Link from 'next/link';
import { Button } from 'shared/components/ui/button';

export default function PublicPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 space-y-6 text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">
          Get started by logging in or creating a new account.
        </p>
        <div className="space-y-4">
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}