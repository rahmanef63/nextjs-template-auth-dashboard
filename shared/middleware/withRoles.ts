import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PERMISSIONS } from '../constants/permissions';
import { rolePermissions } from '../lib/rbac/permissions';

export async function withRoles(
  request: NextRequest,
  requiredPermissions: string[]
) {
  const token = await getToken({ req: request });
  
  if (!token?.role) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userPermissions = rolePermissions[token.role];
  const hasPermission = requiredPermissions.every(
    permission => userPermissions.includes(permission)
  );

  if (!hasPermission) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.next();
}