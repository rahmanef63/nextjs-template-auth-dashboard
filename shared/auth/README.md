# Authentication Module (`/shared/auth`)

## Overview
The authentication module provides a complete authentication solution for Next.js applications, implementing secure user authentication, authorization, and session management features.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point that exports all public authentication APIs
- `README.md` - Comprehensive module documentation

### `/components`
Authentication-related React components:
- `LoginForm.tsx` - Handles user login with email/password, includes validation and error handling
- `RegisterForm.tsx` - Manages user registration process with form validation

### `/constants`
Configuration and constant definitions:
- `endpoints.ts` - Authentication API endpoint configurations
- `index.ts` - Exports all constants
- `roles.ts` - User role definitions and associated permissions

### `/context`
React Context implementation for auth state:
- `auth-context.ts` - TypeScript interfaces for auth context
- `auth-context.tsx` - Core authentication context implementation
- `index.ts` - Exports context components and hooks

### `/guards`
Route protection and authorization:
- `auth-guard.tsx` - Higher-order component for protecting routes based on authentication status and user roles

### `/hooks`
Custom React hooks:
- `use-auth.ts` - Custom hook providing access to authentication state and methods

### `/lib`
Core authentication utilities:
- `api.ts` - Authentication API integration utilities
- `session.ts` - Session management and persistence
- `token.ts` - JWT token handling, storage, and validation

### `/providers`
Context providers:
- `auth-provider.tsx` - Authentication provider component with state management

### `/services`
Authentication business logic:
- `authService.ts` - Core service handling authentication operations and API calls

### `/types`
TypeScript type definitions:
- `auth-types.ts` - Core authentication type definitions
- `index.ts` - Type exports
- `next-auth.d.ts` - NextAuth.js type declarations
- `session.ts` - Session-related interfaces and types

## Key Features

1. **Authentication Flow**
   - Email/password authentication
   - JWT token management
   - Secure session handling
   - Role-based authorization

2. **State Management**
   - Centralized authentication state
   - Persistent session management
   - Secure token storage
   - Real-time auth status updates

3. **Security Features**
   - JWT token validation
   - Role-based access control (RBAC)
   - Protected route guards
   - Secure credential handling

## Best Practices

1. **Security**
   - HTTP-only cookies for token storage
   - Secure headers implementation
   - Proper token validation
   - XSS protection measures

2. **Error Handling**
   - Comprehensive error states
   - User-friendly error messages
   - Session expiration handling
   - Automatic token refresh

3. **Type Safety**
   - Strict TypeScript implementation
   - Comprehensive type definitions
   - Type guard utilities
   - Zero any usage policy

## Usage Example

```typescript
// Using the authentication hook
import { useAuth } from '@/shared/auth/hooks/use-auth';

function MyComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(credentials)}>Login</button>
      )}
    </div>
  );
}
