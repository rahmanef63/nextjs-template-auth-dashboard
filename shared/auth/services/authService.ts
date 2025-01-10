import { prisma } from 'shared/config/database';
import bcrypt from 'bcryptjs';
import type { User } from 'next-auth';
import { RoleType, Role } from 'shared/permission/types/rbac-types';
import { Permission } from 'shared/permission/types/permission-types';
import type { User as PrismaUser, Role as PrismaRole, Permission as PrismaPermission } from '@prisma/client';
import type { User as AppUser } from '../types/auth-types';

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

export async function authenticateUser(email: string, password: string): Promise<AppUser | null> {
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
    description: user.role.description,
    isSystem: user.role.isSystem,
    permissions: user.role.permissions.map(p => ({
      id: p.id,
      name: p.name,
      resource: p.resource,
      action: p.action,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    })),
    createdAt: user.role.createdAt,
    updatedAt: user.role.updatedAt
  };

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    role,
    roleType: user.role.type as RoleType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

export async function registerUser(data: RegisterData): Promise<AppUser> {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // If no roleId provided, get the STANDARD role
  if (!data.roleId) {
    const standardRole = await prisma.role.findFirst({
      where: { type: 'STANDARD' },
      include: { permissions: true }
    });

    if (!standardRole) {
      throw new Error('Default role not found');
    }

    data.roleId = standardRole.id;
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      roleId: data.roleId,
    },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  }) as PrismaUserWithRole;

  const role: Role = {
    id: user.role.id,
    name: user.role.name,
    type: user.role.type as RoleType,
    description: user.role.description,
    isSystem: user.role.isSystem,
    permissions: user.role.permissions.map(p => ({
      id: p.id,
      name: p.name,
      resource: p.resource,
      action: p.action,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    })),
    createdAt: user.role.createdAt,
    updatedAt: user.role.updatedAt
  };

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    role,
    roleType: user.role.type as RoleType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
