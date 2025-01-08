import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser } from 'shared/auth/services/authService';
import type { User } from 'next-auth';
import { RoleType } from 'shared/lib/rbac/types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const authUser = await authenticateUser(credentials.email, credentials.password);
          
          if (!authUser) {
            console.log("Authentication failed");
            return null;
          }

          // Map the authenticated user to NextAuth's User type
          const user: User = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
            role: {
              id: authUser.role.id,
              name: authUser.role.name,
              type: authUser.role.type,
            },
            permissions: authUser.permissions.map(p => p.name),
          };

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = {
          id: token.role.id,
          name: token.role.name,
          type: token.role.type as RoleType,
        };
        session.user.permissions = token.permissions as string[];
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
