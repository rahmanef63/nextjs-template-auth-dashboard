'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from 'shared/hooks/useAuth';
import { ErrorPage } from 'shared/components/pages/error-page';
import { MENU_ITEMS } from 'shared/constants/';
import { PAGE_COMPONENTS } from 'shared/navigation/registry';
import { isValidRoute, getDefaultRoute } from 'shared/navigation';
import { useEffect } from 'react';
import { RolesPage } from 'slices/roles';
import { MenuItem } from 'shared/navigation/types';

export default function DynamicPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const path = `/dashboard/${slug.join('/')}`;

  useEffect(() => {
    if (!user) return;

    // If the current route is invalid, redirect to the default route
    if (!isValidRoute(path, user.role)) {
      router.push(getDefaultRoute(user.role));
    }
  }, [path, user, router]);

  // Handle loading and authentication states
  if (!user) {
    return <ErrorPage title="Authentication Required" message="Please log in to access this page." />;
  }

  // Check route validity
  if (!isValidRoute(path, user.role)) {
    return <ErrorPage />;
  }

  // Special handling for roles page
  if (path === '/dashboard/roles') {
    return <RolesPage />;
  }

  // Find the matching menu item
  const matchingMenuItem = MENU_ITEMS.find((item: MenuItem) => item.path === path);
  if (!matchingMenuItem) {
    return <ErrorPage title="Page Not Found" message="The requested page does not exist." />;
  }

  // Get the page component
  const PageComponent = PAGE_COMPONENTS[matchingMenuItem.id as keyof typeof PAGE_COMPONENTS];
  if (!PageComponent) {
    return <ErrorPage title="Component Error" message="The page component could not be loaded." />;
  }

  return <PageComponent />;
}