import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Permission } from 'shared/lib/rbac/types'
import { rolePermissions } from 'shared/lib/rbac/permissions'

export function withRoles(requiredPermissions: Permission[]) {
  return async function (req: NextRequest) {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const roleName = token.role.name.toUpperCase()
    const userPermissions = rolePermissions[roleName] || []
    const hasPermission = requiredPermissions.every(
      permission => userPermissions.includes(permission)
    )

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    return NextResponse.next()
  }
}