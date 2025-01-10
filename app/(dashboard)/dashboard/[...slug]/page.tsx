'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { useAuth } from 'shared/hooks/useAuth';
import { ErrorPage } from 'shared/components/pages/error-page';
import { menuItems } from 'shared/navigation/config/menu-config';
import { PAGE_COMPONENTS } from 'shared/navigation/registry';
import { isValidRoute, getDefaultRoute } from 'shared/navigation';
import { RouteGroup, createRoutePath } from '@/shared/navigation/constants/navigation-route-constants';
import { useEffect } from 'react';
import { RolesPage } from 'slices/roles';
import { MenuItem } from 'shared/navigation/types';
import { RoleType } from 'shared/permission/types/rbac-types';

// Define the type for the page components registry
type PageComponentsType = typeof PAGE_COMPONENTS;
type PageId = keyof PageComponentsType;

function resolvePath(slugParam: (string | undefined)[]): string {
  if (!slugParam || slugParam.length === 0) return '/dashboard';
  
  // Filter out undefined and empty segments
  const segments = slugParam
    .filter((segment): segment is string => 
      segment !== undefined && segment !== ''
    )
    // Remove duplicate segments and normalize
    .reduce((acc: string[], segment) => {
      // Skip if this segment is the same as the last one
      if (acc.length > 0 && segment === acc[acc.length - 1]) return acc;
      // Skip if it's 'dashboard' and not the first segment
      if (segment === 'dashboard' && acc.length > 0) return acc;
      return [...acc, segment];
    }, []);

  return segments[0] === 'dashboard' 
    ? `/${segments.join('/')}` 
    : `/dashboard/${segments.join('/')}`;
}

export default function DynamicPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const path = resolvePath(slug);

  useEffect(() => {
    if (!user) return;

    // Only redirect if the current path is malformed
    if (pathname && pathname !== path) {
      router.replace(path);
      return;
    }

    const userRole = user.role?.type || RoleType.RESTRICTED;
    if (!isValidRoute(path, userRole)) {
      router.push(getDefaultRoute(userRole));
    }
  }, [pathname, path, user, router]);

  if (!user) {
    return <ErrorPage title="Authentication Required" message="Please log in to access this page." />;
  }

  const userRole = user.role?.type || RoleType.RESTRICTED;

  if (!isValidRoute(path, userRole)) {
    return (
      <ErrorPage 
        title="Access Denied" 
        message="You don't have permission to access this page." 
      />
    );
  }

  if (path === '/dashboard/roles') {
    return <RolesPage />;
  }

  // Find matching menu item using resolved path
  const matchingMenuItem = menuItems.find((item: MenuItem) => item.href === path);

  if (!matchingMenuItem) {
    return <ErrorPage title="Page Not Found" message="The requested page does not exist." />;
  }

  const componentId = matchingMenuItem.id as PageId;
  const PageComponent = PAGE_COMPONENTS[componentId];
  
  if (!PageComponent) {
    return <ErrorPage title="Component Not Found" message="The page component is not registered." />;
  }

  return <PageComponent />;
}