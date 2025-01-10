import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser } from 'shared/auth/services/authService';
import { RoleType } from '@/shared/permission/types';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await authenticateUser(credentials.email, credentials.password);
          
          if (!user) {
            console.log("Authentication failed");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: {
              id: user.role.id,
              name: user.role.name,
              type: user.role.type,
              isSystem: user.role.isSystem,
              createdAt: user.role.createdAt,
              updatedAt: user.role.updatedAt
            },
            roleType: user.roleType,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
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
        token.roleType = user.roleType;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string || '';
        session.user.role = token.role;
        session.user.roleType = token.roleType as RoleType;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};