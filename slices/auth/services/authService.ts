// slices/auth/services/authService.ts

import prisma from 'shared/lib/prisma'
import bcrypt from 'bcrypt'
import type { User } from '@prisma/client'

export type AuthenticatedUser = User & {
  role: {
    name: string;
  };
};

export async function registerUser(email: string, name: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: {
        connect: { name: 'USER' },
      },
      profile: {
        create: {
          bio: '',
          avatarUrl: '',
        },
      },
    },
  })
  return user
}

export async function authenticateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return null;
  }

  return user;
}
