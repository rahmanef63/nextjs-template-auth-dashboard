import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { NavMainItem } from "@/shared/navigation/types/navigation-types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "shared/components/ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "shared/components/ui/sidebar"
import { useSidebar } from '@/shared/components/ui/sidebar'
import { cn } from '@/shared/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

interface NavItemProps {
  item: NavMainItem
}

export function NavItem({ item }: NavItemProps) {
  const IconComponent = item.icon;
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const pathname = usePathname();

  // Ensure we use the correct path from the item
  const getItemPath = (href: string | undefined) => {
    if (!href) return '#';
    // Remove any duplicate dashboard segments
    const segments = href.split('/').filter(s => s !== '');
    const cleanSegments = segments.filter((s, i) => 
      i === 0 || (s !== 'dashboard' && s !== segments[i-1])
    );
    return '/' + cleanSegments.join('/');
  };

  const renderIcon = () => {
    if (!IconComponent) return null;
    return (
      <IconComponent className={cn(
        'h-4 w-4',
        !isCollapsed && 'mr-2'
      )} />
    );
  };

  const renderContent = () => (
    <>
      {renderIcon()}
      {!isCollapsed && item.title}
      {!isCollapsed && item.items && item.items.length > 0 && (
        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
      )}
    </>
  );

  const menuButton = (
    <SidebarMenuButton className={cn(
      isCollapsed && 'justify-center p-2'
    )}>
      {renderContent()}
    </SidebarMenuButton>
  );

  return (
    <SidebarMenuItem>
      {item.items && item.items.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger asChild>
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {menuButton}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              menuButton
            )}
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent asChild>
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={getItemPath(subItem.href)}>{subItem.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </Collapsible>
      ) : (
        isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={getItemPath(item.href)}>
                  {menuButton}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link href={getItemPath(item.href)}>
            {menuButton}
          </Link>
        )
      )}
    </SidebarMenuItem>
  );
}
