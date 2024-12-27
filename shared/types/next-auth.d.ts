import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: {
        id: string;
        name: string;
      };
      permissions: string[];
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    role: {
      id: string;
      name: string;
    };
    permissions: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    role: {
      id: string;
      name: string;
    };
    permissions: string[];
  }
}