import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/shared/lib/prisma';
import { RoleType } from '@/shared/types';
import { Permission } from '@/shared/permission/types/permission-types';

// Function to get permissions for a role from the server
async function getRolePermissions(role: RoleType): Promise<Permission[]> {
  const response = await fetch(`/api/rbac/permissions/role/${role}`);
  if (!response.ok) {
    throw new Error('Failed to fetch role permissions');
  }
  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = session.user.role;
    const permissions = await getRolePermissions(userRole);
    if (!permissions.includes('users:read')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const id = request.nextUrl.pathname.split('/')[3];

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}