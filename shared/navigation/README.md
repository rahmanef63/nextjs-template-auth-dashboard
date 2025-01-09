# Navigation Module (`/shared/navigation`)

## Overview
The navigation module provides a comprehensive solution for managing application navigation, menu structures, and routing with role-based access control. Built with TypeScript and integrated with Next.js routing system, it offers a flexible and type-safe way to handle application navigation.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point exporting public navigation APIs

### `/components`
Navigation UI components:
- `index.ts` - Component exports
- `menu-section.tsx` - Renders a section of the navigation menu with grouping
- `NavigationItem.tsx` - Individual navigation item with active state and permissions

### `/config`
Navigation configuration and menu setup:
- `default-menu.ts` - Default navigation structure and menu items
- `menu-config.ts` - Menu configuration options and types
- `index.ts` - Configuration exports

### `/constants`
Navigation-related constants:
- `index.ts` - Constants exports
- `permissions.ts` - Navigation permission constants and types

### `/hooks`
Custom React hooks:
- `useNavigation.ts` - Hook for navigation state and actions
- `index.ts` - Hook exports

### `/lib`
Core navigation utilities:
- `menu-manager.ts` - Menu state and structure management
- `navigation-store.ts` - Centralized navigation state store
- `index.ts` - Library exports

### `/registry`
Dynamic route registration:
- `index.ts` - Route registry implementation and exports

### `/types`
TypeScript definitions:
- `navigation-types.ts` - Core navigation type definitions
- `index.ts` - Type exports

## Usage Example

```tsx
import { useNavigation } from '@/shared/navigation/hooks'
import { NavigationItem } from '@/shared/navigation/components'

function SidebarNavigation() {
  const { currentPath, navigate } = useNavigation()
  
  return (
    <nav className="space-y-2">
      <NavigationItem
        href="/dashboard"
        icon="dashboard"
        label="Dashboard"
        permission="view:dashboard"
      />
      <NavigationItem
        href="/users"
        icon="users"
        label="User Management"
        permission="manage:users"
      >
        <NavigationItem
          href="/users/list"
          label="User List"
          permission="view:users"
        />
        <NavigationItem
          href="/users/roles"
          label="Role Management"
          permission="manage:roles"
        />
      </NavigationItem>
    </nav>
  )
}
```

## Features

1. **Navigation Management**
   - Type-safe routing with Next.js integration
   - Role-based access control
   - Nested route structures
   - Active route tracking
   - Breadcrumb generation
   - Navigation history management

2. **Menu System**
   - Hierarchical menu structures
   - Dynamic menu generation
   - Permission-based visibility
   - Custom menu sections
   - Collapsible menu groups
   - Icon support
   - Badge integration

3. **State Management**
   - Centralized navigation store
   - Persistent navigation state
   - Route synchronization
   - Navigation events
   - History tracking
   - State restoration

4. **Performance Optimizations**
   - Lazy route loading
   - Memoized navigation items
   - Efficient permission checks
   - Route prefetching
   - Minimal re-renders

## Configuration

```typescript
// Example menu configuration
import { MenuConfig } from '@/shared/navigation/types'

const menuConfig: MenuConfig = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    permission: 'view:dashboard'
  },
  users: {
    path: '/users',
    label: 'Users',
    icon: 'users',
    permission: 'manage:users',
    children: {
      list: {
        path: '/users/list',
        label: 'User List',
        permission: 'view:users'
      },
      roles: {
        path: '/users/roles',
        label: 'Roles',
        permission: 'manage:roles'
      }
    }
  }
}
```

## Best Practices

1. **Route Management**
   - Use type-safe route definitions
   - Implement proper permission checks
   - Handle route transitions gracefully
   - Maintain route history
   - Support deep linking
   - Handle 404 routes

2. **Performance**
   - Implement route code splitting
   - Cache frequently accessed routes
   - Optimize permission checks
   - Minimize route changes
   - Use shallow routing when possible
   - Implement route prefetching

3. **Security**
   - Validate all route permissions
   - Implement route guards
   - Handle unauthorized access
   - Sanitize route parameters
   - Protect sensitive routes
   - Log navigation events

4. **Accessibility**
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management
   - Skip navigation links
   - ARIA landmarks
   - Semantic markup

## Contributing

When extending the navigation system:

1. Follow TypeScript strict mode
2. Add comprehensive JSDoc comments
3. Update type definitions
4. Test permission logic
5. Document new features
6. Consider mobile navigation
7. Maintain backward compatibility
8. Update this README

## Common Patterns

1. **Dynamic Routes**
```typescript
import { useNavigation } from '@/shared/navigation/hooks'

function UserDetail({ userId }: { userId: string }) {
  const { buildPath } = useNavigation()
  const userPath = buildPath('users.detail', { id: userId })
  // Results in: /users/[userId]
}
```

2. **Permission Checks**
```typescript
import { useNavigation } from '@/shared/navigation/hooks'

function ProtectedLink() {
  const { hasPermission } = useNavigation()
  
  if (!hasPermission('manage:users')) {
    return null
  }
  
  return <NavigationItem href="/users" label="Users" />
}
