# Permission Module (`/shared/permission`)

## Overview
The permission module implements a comprehensive Role-Based Access Control (RBAC) system with fine-grained permissions management. Built with TypeScript, it provides type-safe permission checking, role management, and activity logging capabilities.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point exporting public permission APIs

### `/components`
Permission management UI components:
- `PermissionGuard.tsx` - Higher-order component for permission-based rendering
- `role-activity-log.tsx` - Activity logging for role changes
- `role-form.tsx` - Role creation and editing form
- `role-list.tsx` - Role listing and management interface
- `role-manager.tsx` - Main role management dashboard
- `index.ts` - Component exports

### `/config`
RBAC configuration and mappings:
- `menu-config.ts` - Menu permission configurations
- `permissions.ts` - Permission definitions and mappings
- `rbac-config.ts` - RBAC system configuration
- `role-menus.ts` - Role-based menu access configuration
- `role-permissions.ts` - Role permission mappings
- `index.ts` - Configuration exports

### `/constants`
System constants:
- `constants.ts` - General permission constants
- `permission-constants.ts` - Permission and role constants
- `index.ts` - Constants exports

### `/hooks`
Custom React hooks:
- `usePermission.ts` - Hook for permission checking and role management
- `index.ts` - Hook exports

### `/lib`
Core utilities:
- `permission-utils.ts` - Permission checking and validation utilities
- `index.ts` - Utility exports

### `/types`
TypeScript definitions:
- `permissions.ts` - Permission type definitions
- `rbac-types.ts` - RBAC system types
- `index.ts` - Type exports

## Usage Examples

1. **Component Protection**
```tsx
import { PermissionGuard } from '@/shared/permission/components'
import { usePermission } from '@/shared/permission/hooks'

// Using PermissionGuard component
function AdminPanel() {
  return (
    <PermissionGuard
      requires="admin:access"
      fallback={<AccessDenied />}
    >
      <AdminDashboard />
    </PermissionGuard>
  )
}

// Using permission hook
function UserActions() {
  const { hasPermission, hasRole } = usePermission()
  
  if (!hasPermission('users:manage')) {
    return null
  }
  
  return (
    <div>
      <button disabled={!hasPermission('users:create')}>
        Add User
      </button>
      {hasRole('admin') && (
        <button>Delete User</button>
      )}
    </div>
  )
}
```

2. **Role Management**
```tsx
import { usePermission } from '@/shared/permission/hooks'

function RoleManagement() {
  const { 
    assignRole, 
    removeRole, 
    updatePermissions 
  } = usePermission()
  
  const handleRoleAssignment = async (userId: string) => {
    await assignRole(userId, 'editor', {
      permissions: ['content:write', 'content:publish'],
      expires: '30d'
    })
  }
}
```

## Features

1. **Permission Management**
   - Granular permission control
   - Permission inheritance hierarchy
   - Dynamic permission evaluation
   - Wildcard permissions support
   - Permission grouping
   - Temporary permissions
   - Permission delegation

2. **Role System**
   - Role hierarchy management
   - Dynamic role assignment
   - Role inheritance
   - Role composition
   - Time-based roles
   - Role constraints
   - Activity logging

3. **Access Control**
   - Component-level protection
   - Route guards integration
   - Feature flag support
   - UI element visibility
   - API access control
   - Resource-level permissions
   - Audit logging

4. **Performance**
   - Permission caching
   - Optimized permission checks
   - Minimal re-renders
   - Batch permission updates
   - Efficient role evaluation

## Configuration

```typescript
// Example RBAC configuration
import { RBACConfig } from '@/shared/permission/types'

const rbacConfig: RBACConfig = {
  roles: {
    admin: {
      inherits: ['manager'],
      permissions: ['*'],
    },
    manager: {
      inherits: ['user'],
      permissions: [
        'users:manage',
        'content:manage',
        'reports:view'
      ],
    },
    user: {
      permissions: [
        'profile:edit',
        'content:view'
      ],
    }
  },
  permissionGroups: {
    content: [
      'content:view',
      'content:create',
      'content:edit',
      'content:delete',
      'content:publish'
    ],
    users: [
      'users:view',
      'users:create',
      'users:edit',
      'users:delete'
    ]
  }
}
```

## Best Practices

1. **Permission Design**
   - Use descriptive permission names
   - Implement permission hierarchy
   - Follow least privilege principle
   - Group related permissions
   - Document permission requirements
   - Version permission changes
   - Audit permission usage

2. **Performance**
   - Cache permission results
   - Batch permission checks
   - Optimize role evaluations
   - Use permission trees
   - Implement lazy loading
   - Monitor performance impact

3. **Security**
   - Validate permissions server-side
   - Implement permission expiry
   - Log permission changes
   - Secure role assignments
   - Prevent permission escalation
   - Regular security audits
   - Handle edge cases

4. **Development**
   - Use TypeScript for type safety
   - Write comprehensive tests
   - Document permission changes
   - Follow naming conventions
   - Implement error handling
   - Maintain backwards compatibility

## Contributing

When extending the permission system:

1. Follow TypeScript strict mode
2. Add comprehensive tests
3. Document new permissions
4. Update type definitions
5. Consider performance impact
6. Maintain backward compatibility
7. Add migration guides
8. Update this README
