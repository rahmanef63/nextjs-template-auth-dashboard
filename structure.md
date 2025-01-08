# Project Structure Documentation

## Root Directory Structure

```
nextjs-template-auth-dashboard/
├── app/                    # Next.js 13+ app directory (routes and API endpoints)
├── docs/                   # Project documentation
├── prisma/                # Database schema and migrations
├── shared/                # Shared utilities, components, and types
├── slices/                # Redux slices for state management
├── __tests__/             # Test files
├── types/                 # Global type definitions
└── public/                # Static assets
```

## Key Directories Breakdown

### `/app` Directory
Contains the Next.js 13+ application routes and API endpoints.
```
app/
├── api/                   # API routes
│   ├── auth/             # Authentication endpoints
│   ├── users/            # User management endpoints
│   └── notifications/    # Notification endpoints
├── dashboard/            # Dashboard pages
├── auth/                 # Authentication pages
└── layout.tsx            # Root layout component
```

### `/shared` Directory
Reusable code and utilities shared across the application.
```
shared/
├── auth/                 # Authentication related code
│   ├── lib/             # Auth utilities
│   ├── services/        # Auth services
│   └── types/           # Auth type definitions
├── dashboard/           # Dashboard related components and utilities
├── lib/                 # Common utilities
├── navigation/          # Navigation components and utilities
├── rbac/               # Role-based access control
├── services/           # Common services
├── types/              # Shared type definitions
│   ├── analytics.ts    # Analytics related types
│   ├── auth.ts         # Auth related types
│   ├── common.ts       # Common shared types
│   ├── export.ts       # Export functionality types
│   ├── Notification.ts # Notification system types
│   ├── sidebar.ts      # Sidebar navigation types
│   └── User.ts         # User related types
└── utils/              # Utility functions
```

### `/slices` Directory
Redux state management slices.
```
slices/
├── auth/               # Authentication state
├── ui/                # UI state management
└── user/              # User state management
```

### `/prisma` Directory
Database schema and migrations.
```
prisma/
├── migrations/        # Database migrations
└── schema.prisma     # Prisma schema
```

## Potential DRY Issues

1. **Type Definitions**:
   - Types are spread across multiple directories:
     - `/shared/types/`
     - `/shared/auth/types/`
     - `/types/`
   - Consider consolidating all types under `/shared/types`

2. **Authentication Logic**:
   - Auth-related code exists in multiple places:
     - `/app/api/auth/`
     - `/shared/auth/`
     - `/slices/auth/`
   - Consider centralizing auth logic in `/shared/auth`

3. **Utility Functions**:
   - Utils are scattered across:
     - `/shared/utils/`
     - `/shared/lib/`
     - Various feature directories
   - Consider merging `/shared/utils` and `/shared/lib`

4. **Service Layer**:
   - Services are split between:
     - `/shared/services/`
     - Feature-specific service files
   - Consider standardizing service layer structure

## Recommendations

1. **Type Organization**:
   - Move all types to `/shared/types`
   - Use barrel exports (index.ts) for better organization
   - Follow consistent naming conventions (PascalCase for interfaces/types)

2. **Service Layer**:
   - Create a unified service layer under `/shared/services`
   - Use feature-based organization within services
   - Implement consistent error handling and response types

3. **Utility Functions**:
   - Consolidate utilities under `/shared/utils`
   - Create category-based organization (date, string, array utils)
   - Implement proper typing for all utility functions

4. **Authentication**:
   - Centralize auth logic in `/shared/auth`
   - Create clear separation between auth UI and logic
   - Use consistent types across auth implementations

## Best Practices

1. **Naming Conventions**:
   - Use PascalCase for components and type definitions
   - Use camelCase for functions and variables
   - Use kebab-case for file names
   - Use SCREAMING_SNAKE_CASE for constants

2. **File Organization**:
   - Group related files together
   - Use index.ts files for clean exports
   - Keep components and their types close together

3. **Code Sharing**:
   - Use barrel exports for clean imports
   - Create abstraction layers for third-party dependencies
   - Implement proper dependency injection

4. **Type Safety**:
   - Avoid using 'any' type
   - Use proper type definitions
   - Implement proper error handling with typed errors
