import { MenuItem } from '@/shared/navigation/types/navigation-types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { useSidebar } from '@/shared/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  defaultOpen?: boolean;
}

export function MenuSection({ title, items, defaultOpen = false }: MenuSectionProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div className="px-3 py-2">
      {!isCollapsed && (
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    item.isActive && 'bg-muted',
                    isCollapsed && 'justify-center p-0'
                  )}
                  asChild
                >
                  <Link href={item.href || '#'}>
                    {item.icon && (
                      <item.icon className={cn(
                        'h-4 w-4',
                        !isCollapsed && 'mr-2'
                      )} />
                    )}
                    {!isCollapsed && item.title}
                  </Link>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
