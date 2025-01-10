import type { User, BaseUser } from './auth-types';
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: BaseUser & {
      image?: string | null;
    };
  }

  interface User extends DefaultUser, BaseUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, Omit<BaseUser, 'id'> {}
}
