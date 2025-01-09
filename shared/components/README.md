# Components Module (`/shared/components`)

## Overview
The components module provides a comprehensive collection of reusable UI components built with React and Tailwind CSS. These components follow modern design principles, accessibility standards, and are fully typed with TypeScript.

## Directory Structure and File Descriptions

### `/error`
Error handling components:
- `ErrorBoundary.tsx` - React error boundary component for graceful error handling
- `ErrorDisplay.tsx` - Customizable error message display with retry capabilities

### `/layout`
Application layout and theme components:
- `providers.tsx` - Centralized provider wrapper for themes, notifications, and other contexts
- `theme-provider.tsx` - Theme management with dark/light mode support

### `/notifications`
Notification system:
- `NotificationCenter.tsx` - Centralized notification management with queue support

### `/pages`
Common page-level components:
- `error-page.tsx` - Standardized error page with customizable messages
- `page-header.tsx` - Consistent page header with breadcrumbs and actions

### `/ui`
Core UI components built with React, Radix UI, and Tailwind CSS.

#### Form Controls
- `button.tsx` - Polymorphic button component with variants
- `checkbox.tsx` - Accessible checkbox with custom styles
- `form.tsx` - Form wrapper with validation integration
- `input.tsx` - Text input with built-in validation
- `input-otp.tsx` - One-time password input with auto-focus
- `label.tsx` - Form label with required field support
- `radio-group.tsx` - Accessible radio button group
- `select.tsx` - Customizable select dropdown
- `textarea.tsx` - Multi-line text input
- `switch.tsx` - Toggle switch with animations

#### Layout Components
- `accordion.tsx` - Animated accordion with keyboard navigation
- `aspect-ratio.tsx` - Maintains content aspect ratios
- `card.tsx` - Flexible card container with variants
- `dialog.tsx` - Modal dialog with focus management
- `drawer.tsx` - Slide-out drawer with animations
- `separator.tsx` - Visual separator with orientation
- `sheet.tsx` - Responsive side panel

#### Navigation
- `breadcrumb.tsx` - Dynamic breadcrumb navigation
- `menubar.tsx` - Accessible horizontal menu
- `navigation-menu.tsx` - Responsive navigation menu
- `pagination.tsx` - Table/list pagination controls
- `sidebar.tsx` - Collapsible sidebar navigation
- `tabs.tsx` - Accessible tabbed interface

#### Overlay Components
- `alert-dialog.tsx` - Confirmation dialogs
- `context-menu.tsx` - Right-click menu
- `dropdown-menu.tsx` - Multi-level dropdown
- `hover-card.tsx` - Preview card on hover
- `popover.tsx` - Positioned popover
- `tooltip.tsx` - Information tooltip

#### Data Display
- `avatar.tsx` - User avatar with fallback
- `badge.tsx` - Status and label badges
- `calendar.tsx` - Date picker calendar
- `carousel.tsx` - Touch-enabled carousel
- `chart.tsx` - Data visualization
- `progress.tsx` - Progress indicators
- `table.tsx` - Sortable and filterable table

#### Utility Components
- `collapsible.tsx` - Animated collapsible section
- `command.tsx` - Command palette (⌘K)
- `loading-spinner.tsx` - Loading indicators
- `resizable.tsx` - Resizable panels
- `scroll-area.tsx` - Custom scrollbar
- `skeleton.tsx` - Loading placeholders
- `slider.tsx` - Range slider control
- `sonner.tsx` - Toast notification system
- `toast.tsx` - Individual toast
- `toaster.tsx` - Toast container
- `toggle.tsx` - Pressable toggle
- `toggle-group.tsx` - Group of toggles

## Usage Example

```tsx
import { Button } from '@/shared/components/ui/button'
import { Dialog } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'

function MyComponent() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder="Enter your name"
            className="col-span-3"
          />
        </div>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
```

## Features

1. **Accessibility**
   - WCAG 2.1 compliance
   - Full keyboard navigation
   - Screen reader optimized
   - Focus trap management
   - ARIA labels and roles

2. **Theming**
   - Dark/light mode support
   - CSS variables for customization
   - Tailwind CSS integration
   - Consistent design tokens
   - Responsive breakpoints

3. **Performance**
   - Code splitting by default
   - Lazy loaded components
   - Optimized bundle size
   - Efficient re-renders
   - Memoized event handlers

## Best Practices

1. **Component Design**
   - Composition over inheritance
   - Controlled and uncontrolled variants
   - Prop type validation
   - Default prop values
   - Error boundary protection

2. **Styling**
   - Tailwind CSS utility classes
   - CSS variables for theming
   - Mobile-first approach
   - Responsive design patterns
   - CSS-in-JS when needed

3. **Performance**
   - React.memo for expensive renders
   - useCallback for handlers
   - Lazy loading with Suspense
   - Bundle size monitoring
   - Virtual scrolling for large lists

## Contributing

When adding new components:
1. Follow the established file structure
2. Include comprehensive TypeScript types
3. Add proper JSDoc documentation
4. Ensure accessibility compliance
5. Write unit tests
6. Include usage examples
7. Update this README
