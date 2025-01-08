'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

export const useBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) || [];
    
    return segments.reduce<BreadcrumbItem[]>((acc, segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      const isCurrentPage = index === segments.length - 1;

      acc.push({
        label,
        href,
        isCurrentPage,
      });

      return acc;
    }, []);
  }, [pathname]);

  return breadcrumbs;
};
