# Authentication Module (`/shared/auth`)

## Overview
The authentication module provides a complete authentication solution for the application, including context management, guards, hooks, and services.

## Directory Structure and File Descriptions

### Root Files
- `index.ts` - Main entry point, exports all public authentication APIs
- `README.md` - Module documentation

### `/components`
Authentication-related UI components.
- `LoginForm.tsx` - Login form implementation with email/password authentication
- `RegisterForm.tsx` - User registration form implementation

### `/constants`
Authentication-related constant values.
- `endpoints.ts` - API endpoint definitions for authentication services
- `roles.ts` - User role definitions and permissions

### `/context`
Authentication state management using React Context.
- `auth-context.ts` - Type definitions for authentication context
- `auth-context.tsx` - Authentication context implementation
- `index.ts` - Context exports

### `/guards`
Route protection components.
- `auth-guard.tsx` - Protects routes based on authentication status
- `permission-guard.tsx` - Protects routes based on user permissions

### `/hooks`
Custom React hooks for authentication.
- `use-auth.ts` - Hook for accessing authentication context and methods

### `/lib`
Authentication utility functions.
- `api.ts` - Authentication API utility functions
- `session.ts` - Session management utilities
- `token.ts` - JWT token management and validation

### `/providers`
Authentication provider components.
- `auth-provider.tsx` - Main authentication provider implementation

### `/services`
Authentication service implementations.
- `authService.ts` - Core authentication service for API interactions

### `/types`
Type definitions for authentication.
- `auth-types.ts` - Core authentication interfaces and types
- `index.ts` - Type exports
- `next-auth.d.ts` - NextAuth type declarations and extensions
- `session.ts` - Session-related type definitions

## Key Features

1. **Authentication Flow**
   - Email/password authentication
   - Token-based authentication
   - Session management
   - Permission-based access control

2. **State Management**
   - Centralized auth state
   - Secure token storage
   - Session persistence

3. **Security Features**
   - Role-based access control
   - Permission-based guards
   - Secure token handling
   - Session validation

## Best Practices

1. **Security**
   - HTTP-only cookies for tokens
   - Secure headers implementation
   - Role-based access control
   - Permission validation

2. **Error Handling**
   - Consistent error responses
   - Session timeout handling
   - Invalid token management

3. **Type Safety**
   - Strict type checking
   - Type guards implementation
   - No 'any' type usage
