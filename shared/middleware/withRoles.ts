import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Permission } from 'shared/permission/types/permission-types'
import { RoleType } from 'shared/permission/types/rbac-types'
import { ROLE_PERMISSIONS } from 'shared/permission/config/role-permissions'

export function withRoles(requiredPermissions: Permission[]) {
  return async function (req: NextRequest) {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const roleName = token.role?.name?.toUpperCase() as RoleType
    if (!roleName || !(roleName in ROLE_PERMISSIONS)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 403 }
      )
    }

    const userPermissions = ROLE_PERMISSIONS[roleName]
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