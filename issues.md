# Project Issues and Solutions

## Current Issues (as of 2025-01-06)

### 1. Next Auth Route Type Issues
**File**: `app/api/auth/[...nextauth]/route.ts`
```typescript
// Error: The left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter
createdAt: user.role.createdAt instanceof Date 
```
**Root Cause**: Type inference issue with role properties from next-auth types

**Solution**:
- Use type assertion for Date objects
- Update role type definition in next-auth types

### 2. React Context Type Issues
**File**: `shared/auth/context/auth-context.tsx`
```typescript
// Error: 'React' refers to a UMD global
children: React.ReactNode
```
**Root Cause**: Incorrect React type import

**Solution**:
- Import React namespace
- Use proper type imports

### 3. Auth Service Type Issues
**File**: `shared/auth/services/authService.ts`
```typescript
// Error: Property 'description' does not exist on type...
role: { description: string }
```
**Root Cause**: Prisma type intersection not including optional fields

**Solution**:
- Define complete interface matching Prisma schema
- Use proper type extensions

### 4. Next Auth Type Declaration Issues
**File**: `shared/auth/types/next-auth.ts`
```typescript
// Error: Property 'user' must be of type 'BaseUser'
```
**Root Cause**: Inconsistent type declarations in module augmentation

**Solution**:
- Created internal IUser interface for our custom properties
- Extended Session user with both IUser and DefaultSession['user']
- Used Omit to prevent type conflicts in JWT
- Extended User with both IUser and DefaultUser
- Removed unnecessary type assertions in auth route

### 5. Type Import vs Value Import Issues
**File**: `shared/auth/services/authService.ts`
```typescript
// Error: 'Permission' cannot be used as a value because it was imported using 'import type'
import type { Permission } from 'shared/rbac/types/rbac-types';
```
**Solution**:
- Remove `type` from the import for enums that need to be used as values
- Use separate imports for types and values:
```typescript
import { Permission } from 'shared/rbac/types/rbac-types';
import type { Role } from 'shared/rbac/types/rbac-types';
```

### 6. Date String Type Issues
**File**: `app/api/auth/[...nextauth]/route.ts`
```typescript
// Error: Property 'toISOString' does not exist on type 'string'
createdAt: user.role.createdAt.toISOString(),
```
**Solution**:
- Check if value is Date before calling toISOString
- Add type guard:
```typescript
createdAt: (user.role.createdAt instanceof Date) 
  ? user.role.createdAt.toISOString() 
  : user.role.createdAt
```

### 7. Prisma Type Mismatches
**File**: `shared/auth/services/authService.ts`
```typescript
// Error: Property 'description' does not exist on type...
// Error: Property 'isSystem' does not exist on type...
```
**Solution**:
- Update PrismaRole interface to match database schema
- Use Prisma generated types:
```typescript
import type { Role as DbRole } from '@prisma/client';
```

### 8. React Type Issues
**File**: `shared/auth/context/auth-context.tsx`
```typescript
// Error: 'React' refers to a UMD global
children: React.ReactNode
```
**Solution**:
- Import React explicitly or use type import:
```typescript
import type { ReactNode } from 'react';
// or
import * as React from 'react';
```

### 9. Next-Auth Type Extension Issues
**File**: `shared/auth/types/next-auth.ts`
```typescript
// Error: Property 'user' must be of type 'BaseUser'
```
**Solution**:
- Ensure consistent type usage in module augmentation
- Use proper type extension:
```typescript
declare module 'next-auth' {
  interface Session {
    user: BaseUser;
  }
}
```

## Debugging Steps

1. Type Import Issues:
   - Check if imported type is used as value
   - Separate type and value imports
   - Use proper import syntax for enums

2. Date Handling:
   - Add type guards for Date objects
   - Handle string dates properly
   - Convert dates consistently

3. Prisma Types:
   - Use generated Prisma types
   - Update interfaces to match schema
   - Handle optional fields properly

4. React Types:
   - Use proper import syntax
   - Import types explicitly
   - Use type imports where possible

5. Next-Auth Types:
   - Follow module augmentation patterns
   - Keep type extensions consistent
   - Use proper base types

## Common Patterns to Watch

1. Type vs Value Imports:
   ```typescript
   // Types only
   import type { SomeType } from './types';
   // Values (including enums)
   import { SomeEnum } from './enums';
   ```

2. Date Handling:
   ```typescript
   const dateString = date instanceof Date ? date.toISOString() : date;
   ```

3. Prisma Types:
   ```typescript
   import type { ModelName } from '@prisma/client';
   interface ExtendedModel extends ModelName {
     additionalField: string;
   }
   ```

4. React Types:
   ```typescript
   import type { ReactNode } from 'react';
   interface Props {
     children: ReactNode;
   }
   ```

5. Next-Auth:
   ```typescript
   declare module 'next-auth' {
     interface User extends BaseUser {}
     interface Session {
       user: User;
     }
   }
   ```

## Applied Solutions

1. Type Definition Consolidation
   - Kept `shared/auth/types/next-auth.d.ts` as the single source of truth
   - Removed redundant files
   - Properly integrated with RBAC types

2. Auth Service Improvements
   - Added PrismaRole and PrismaPermission interfaces
   - Consistent date string handling
   - Proper optional field handling
   - Fixed permission mapping

3. Auth Route Fixes
   - Safe type checking for dates
   - Proper null/undefined handling
   - Consistent string defaults

4. Auth Context Updates
   - Fixed React type imports
   - Proper component typing

5. Permission Handling
   - Using Permission enum values
   - Proper mapping from Prisma types
   - Consistent type definitions

6. Date and String Handling
   - Direct toISOString() calls
   - Empty string defaults
   - Removed complex type guards

7. React and Component Types
   - Proper React type imports
   - Consistent ReactNode usage
   - Fixed component prop types

8. Type System Improvements
   - Single source of truth for types
   - Consistent interface usage
   - Proper type extensions

## Next Steps

1. Testing
   - Add unit tests for auth flows
   - Test edge cases in type conversions
   - Verify date handling across the system
   - Add unit tests for permission mapping
   - Test date handling
   - Verify type conversions

2. Documentation
   - Document type system architecture
   - Add API documentation
   - Document auth flow
   - Document permission system
   - Document type architecture
   - Add API documentation

3. Future Improvements
   - Consider runtime type validation
   - Add error boundaries
   - Implement proper error handling
   - Add logging system
   - Add runtime type validation
   - Consider zod for schema validation
   - Add error boundaries
   - Implement logging

This document serves as a reference for common type issues and their solutions in the project.
