# Authentication Module (`/shared/auth`)

## Overview
The authentication module provides a complete authentication solution for Next.js applications using NextAuth.js, implementing secure user authentication, authorization, and session management features with TypeScript support.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point that exports all public authentication APIs
- `README.md` - Module documentation

### `/components`
Authentication-related React components:
- `LoginForm.tsx` - Handles user login with email/password
- `RegisterForm.tsx` - Manages user registration process

### `/constants`
Configuration and constant definitions:
- `endpoints.ts` - Authentication API endpoint configurations
- `index.ts` - Exports all constants
- `roles.ts` - User role definitions and permissions

### `/context`
React Context implementation for auth state:
- `auth-context.tsx` - Core authentication context implementation with TypeScript types
- `index.ts` - Re-exports context components

### `/guards`
Route protection and authorization:
- `auth-guard.tsx` - Route protection based on authentication status and user roles

### `/hooks`
Custom React hooks:
- `use-auth.ts` - Hook for accessing authentication state and methods

### `/lib`
Core authentication utilities:
- `api.ts` - Authentication API integration
- `session.ts` - Session management
- `token.ts` - JWT token handling

### `/providers`
Context providers:
- `auth-provider.tsx` - NextAuth.js provider integration with session management

### `/services`
Authentication business logic:
- `authService.ts` - Core authentication operations

### `/types`
Type definitions:
- `auth-types.ts` - Base user and authentication types
- `next-auth.d.ts` - NextAuth.js type extensions
- `session.ts` - Session type definitions

## Usage

### Setup

1. Wrap your app with auth providers:
```tsx
// app/layout.tsx
import { NextAuthProvider } from '@/shared/auth';

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  );
}
```

2. Use authentication in components:
```tsx
import { useAuthContext } from '@/shared/auth';

function MyComponent() {
  const { user, login, logout, loading } = useAuthContext();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return (
    <div>
      Welcome {user.name}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

3. Protect routes with auth guard:
```tsx
import { AuthGuard } from '@/shared/auth';

function ProtectedPage() {
  return (
    <AuthGuard>
      <YourProtectedComponent />
    </AuthGuard>
  );
}
```

## Key Features

- NextAuth.js Integration with Type Safety
- Role-based Access Control (RBAC)
- Type-safe Authentication Context
- Protected Route Guards
- Session Management
- JWT Token Handling

## Type System

The module uses a comprehensive type system:

```typescript
// Base User Type
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: Role;
  roleType: RoleType;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Context Type
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}
