import type { Role, Permission } from 'shared/rbac/types/rbac-types';
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

interface IUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  permissions: Permission[];
}

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }

  interface User extends IUser, DefaultUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends Omit<DefaultJWT, 'role' | 'permissions'>, IUser {}
}
