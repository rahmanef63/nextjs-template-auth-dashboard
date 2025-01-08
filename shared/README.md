# Shared Modules Documentation

## Core Modules Overview

### `/config`
Configuration management module.
- `auth.ts` - Authentication configuration
- `database.ts` - Database connection settings
- `navigation.tsx` - Navigation structure config
- `pages.ts` - Page-specific configurations
- `user-nav.tsx` - User navigation settings

### `/constants`
Application-wide constants.
- `appConfig.ts` - Application configuration constants
- `endpoints.ts` - API endpoint definitions
- `notifications.ts` - Notification system constants
- `permissions.ts` - Permission constants
- `routes.ts` - Route definitions

### `/hooks`
Shared React hooks.
- `index.ts` - Hook exports
- `use-mobile.tsx` - Mobile device detection
- `use-toast.ts` - Toast notification management
- `useAuth.ts` - Authentication state management
- `useBreadcrumb.ts` - Breadcrumb navigation
- `useNavigationItems.ts` - Navigation items management
- `useNotifications.ts` - Notification system
- `usePermissions.ts` - Permission checking
- `useSidebarData.ts` - Sidebar state management

### `/lib`
Core utility libraries.
- `apiClient.ts` - API client implementation
- `audit.ts` - Audit logging utilities
- `auth.ts` - Authentication utilities
- `logger.ts` - Logging system
- `prisma.ts` - Database client
- `storage.ts` - Storage utilities
- `utils.ts` - General utilities
- `validation.ts` - Data validation

#### `/lib/api`
API utilities.
- `errorHandler.ts` - API error handling
- `responseHandler.ts` - API response formatting

#### `/lib/validation`
Validation utilities.
- `notificationValidation.ts` - Notification data validation
- `userValidation.ts` - User data validation

### `/middleware`
Request middleware.
- `withAuth.ts` - Authentication middleware
- `withRoles.ts` - Role-based access middleware

### `/services`
Service implementations.

#### `/services/analytics`
- `analyticsService.ts` - Analytics data handling

#### `/services/export`
- `exportService.ts` - Data export functionality

#### `/services/notification`
- `notificationService.ts` - Notification handling

### `/types`
TypeScript type definitions.
- `analytics.ts` - Analytics types
- `ApiResponse.ts` - API response types
- `auth.ts` - Authentication types
- `common.ts` - Shared types
- `export.ts` - Export functionality types
- `index.ts` - Type exports
- `Notification.ts` - Notification system types
- `sidebar.ts` - Sidebar component types
- `User.ts` - User-related types

### `/utils`
Utility functions.

#### `/utils/date`
Date manipulation utilities.
- `dateHelpers.ts` - Date helper functions
- `formatDate.ts` - Date formatting utilities

#### `/utils/string`
String manipulation utilities.
- `formatters.ts` - String formatting
- `stringUtils.ts` - String utilities

#### `/utils/validation`
Validation utilities.
- `schemas.ts` - Validation schemas
- `validators.ts` - Validation functions

## Best Practices

1. **Code Organization**
   - Keep related code together
   - Use clear naming conventions
   - Maintain consistent file structure
   - Document complex logic

2. **Type Safety**
   - Use TypeScript strictly
   - Define clear interfaces
   - Avoid type assertions
   - Maintain type exports

3. **Performance**
   - Optimize imports
   - Use lazy loading
   - Implement caching
   - Minimize bundle size

4. **Security**
   - Validate inputs
   - Sanitize outputs
   - Implement proper error handling
   - Follow security best practices

## Usage Guidelines

1. **Adding New Features**
   - Follow existing patterns
   - Update documentation
   - Add proper types
   - Include tests

2. **Modifying Existing Code**
   - Maintain backwards compatibility
   - Update affected modules
   - Follow deprecation patterns
   - Update documentation

3. **Dependencies**
   - Keep dependencies updated
   - Minimize external dependencies
   - Use peer dependencies
   - Document version requirements
