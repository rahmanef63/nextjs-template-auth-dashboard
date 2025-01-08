# Components Module (`/shared/components`)

## Overview
The components module contains all shared UI components used across the application, from basic UI elements to complex layout components.

## Directory Structure and File Descriptions

### `/error`
Error handling components.
- `ErrorBoundary.tsx` - React error boundary for catching and handling component errors
- `ErrorDisplay.tsx` - Component for displaying error messages and details

### `/layout`
Layout and theming components.
- `providers.tsx` - Application-wide provider components wrapper
- `theme-provider.tsx` - Theme provider implementation for styling

### `/notifications`
Notification system components.
- `NotificationCenter.tsx` - Central notification management component

### `/pages`
Common page-level components.
- `error-page.tsx` - Standard error page component
- `page-header.tsx` - Reusable page header component

### `/ui`
Core UI components library.

#### Form Elements
- `button.tsx` - Button component with variants
- `checkbox.tsx` - Checkbox input component
- `form.tsx` - Form wrapper component
- `input.tsx` - Text input component
- `input-otp.tsx` - One-time password input
- `label.tsx` - Form label component
- `radio-group.tsx` - Radio button group
- `select.tsx` - Select dropdown component
- `textarea.tsx` - Multiline text input
- `switch.tsx` - Toggle switch component

#### Layout Components
- `accordion.tsx` - Collapsible content sections
- `aspect-ratio.tsx` - Aspect ratio container
- `card.tsx` - Card container component
- `dialog.tsx` - Modal dialog component
- `drawer.tsx` - Slide-out drawer component
- `separator.tsx` - Visual separator
- `sheet.tsx` - Side panel component

#### Navigation Components
- `breadcrumb.tsx` - Breadcrumb navigation
- `menubar.tsx` - Horizontal menu bar
- `navigation-menu.tsx` - Navigation menu component
- `pagination.tsx` - Pagination controls
- `sidebar.tsx` - Application sidebar
- `tabs.tsx` - Tabbed interface

#### Overlay Components
- `alert-dialog.tsx` - Alert dialog box
- `context-menu.tsx` - Right-click context menu
- `dropdown-menu.tsx` - Dropdown menu
- `hover-card.tsx` - Hover information card
- `popover.tsx` - Popover component
- `tooltip.tsx` - Tooltip component

#### Data Display
- `avatar.tsx` - User avatar component
- `badge.tsx` - Status badge component
- `calendar.tsx` - Calendar display
- `carousel.tsx` - Image/content carousel
- `chart.tsx` - Data visualization
- `progress.tsx` - Progress indicator
- `table.tsx` - Data table component

#### Utility Components
- `collapsible.tsx` - Collapsible container
- `command.tsx` - Command palette interface
- `resizable.tsx` - Resizable container
- `scroll-area.tsx` - Custom scrollable area
- `skeleton.tsx` - Loading skeleton
- `slider.tsx` - Range slider
- `sonner.tsx` - Toast notification manager
- `toast.tsx` - Toast notification
- `toaster.tsx` - Toast container
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Group of toggle buttons

## Features

1. **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Focus management

2. **Theming**
   - Dark/light mode support
   - Customizable styles
   - Consistent design tokens
   - Responsive design

3. **Performance**
   - Lazy loading
   - Code splitting
   - Optimized renders
   - Efficient state management

## Best Practices

1. **Component Design**
   - Single responsibility
   - Prop type validation
   - Default props
   - Error boundaries

2. **Styling**
   - CSS-in-JS
   - Responsive design
   - Theme consistency
   - Mobile-first approach

3. **Performance**
   - Memoization
   - Lazy loading
   - Bundle optimization
   - Event handling
