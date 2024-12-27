// slices/auth/services/authService.ts

import { prisma } from 'shared/config/database';
import bcrypt from 'bcryptjs';
import { Role, Prisma } from '@prisma/client';

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  permissions: string[];
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  role?: Role;
};

export async function authenticateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return null;
  }

  return {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.role.permissions.map(p => p.name),
  };
}

export async function registerUser(data: RegisterData): Promise<AuthenticatedUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const role = await prisma.role.findFirst({
    where: { name: data.role?.name || 'CLIENT' },
    include: {
      permissions: true,
    },
  });

  if (!role) {
    throw new Error('Invalid role');
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: {
        connect: { id: role.id },
      },
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  return {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.role.permissions.map(p => p.name),
  };
}
