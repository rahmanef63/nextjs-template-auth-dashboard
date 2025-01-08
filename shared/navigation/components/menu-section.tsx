'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from 'shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} 
from 'shared/components/ui/collapsible';
import { MenuItem } from 'shared/navigation/types/navigation-types';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from 'shared/lib/utils';
import { SidebarMenuItem, useSidebar } from 'shared/components/ui/sidebar';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export function MenuSection({ title, items, defaultOpen = false, icon }: MenuSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuItem className="list-none">
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full hover:bg-transparent",
            isCollapsed ? "justify-center px-2" : "justify-between px-2"
          )}
        >
          <div className={cn(
            "flex items-center gap-2",
            isCollapsed && "justify-center"
          )}>
            {icon && <div className={cn(
              "flex items-center justify-center",
              isCollapsed && "w-full"
            )}>{icon}</div>}
            <span className={cn(
              "text-xs font-semibold uppercase text-muted-foreground transition-all",
              isCollapsed ? "hidden" : "block"
            )}>
              {title}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180",
              isCollapsed && "hidden"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(isCollapsed && "hidden")}>
        <div className="space-y-1 px-2">
          {items.map((item) => {
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href={item.path}>
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span className={cn(
                    "text-sm font-medium",
                    isCollapsed ? "hidden" : "block"
                  )}>
                    {item.label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  </SidebarMenuItem>
  );
}