"use client"

import React from 'react'
import { MenuItem } from "@/shared/navigation/types/navigation-types"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/components/ui/sidebar"
import { NavItem } from './nav-item'

interface NavMainProps {
  title: string;
  items: MenuItem[];
  defaultOpen?: boolean;
}

export function NavMain({ title, items, defaultOpen }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
