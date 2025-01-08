import { prisma } from 'shared/config/database';
import bcrypt from 'bcryptjs';
import type { User } from 'next-auth';
import { Permission, RoleType, Role } from 'shared/permission/types/rbac-types';
import type { User as PrismaUser, Role as PrismaRole, Permission as PrismaPermission } from '@prisma/client';
import type { IUser } from '../types/next-auth';

type PrismaRoleWithPermissions = PrismaRole & {
  permissions: PrismaPermission[];
  description?: string;
  isSystem?: boolean;
};

type PrismaUserWithRole = PrismaUser & {
  role: PrismaRoleWithPermissions;
};

export type AuthenticatedUser = User;

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  roleId?: string;
};

export async function authenticateUser(email: string, password: string): Promise<IUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  }) as PrismaUserWithRole | null;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const role: Role = {
    id: user.role.id,
    name: user.role.name,
    type: user.role.type as RoleType,
    description: user.role.description || '',
    isSystem: user.role.isSystem || false,
    permissions: user.role.permissions.map(p => p.name as Permission),
    createdAt: user.role.createdAt.toISOString(),
    updatedAt: user.role.updatedAt.toISOString()
  };

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    role,
    permissions: role.permissions
  } as IUser;
}

export async function registerUser(data: RegisterData): Promise<IUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Get default role if not specified
  const defaultRole = await prisma.role.findFirst({
    where: { type: 'CUSTOM' },
    include: {
      permissions: true
    }
  }) as PrismaRoleWithPermissions | null;

  if (!defaultRole) {
    throw new Error('Default role not found');
  }

  const user: PrismaUserWithRole = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: {
        connect: {
          id: data.roleId || defaultRole.id,
        },
      },
    },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    },
  }) as PrismaUserWithRole;

  const role: Role = {
    id: user.role.id,
    name: user.role.name,
    type: user.role.type as RoleType,
    description: user.role.description || '',
    isSystem: user.role.isSystem || false,
    permissions: user.role.permissions.map(p => p.name as Permission),
    createdAt: user.role.createdAt.toISOString(),
    updatedAt: user.role.updatedAt.toISOString()
  };

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    role,
    permissions: role.permissions
  } as IUser;
}
