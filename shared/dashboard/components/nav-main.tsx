"use client"

import { ChevronRight } from "lucide-react"
import { useNavigationItems } from "shared/hooks/useNavigationItems"
import { MenuItem } from "shared/navigation/types/navigation-types"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "shared/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "shared/components/ui/sidebar"

export function NavMain() {
  const items = useNavigationItems()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <div className="space-y-1">
        {items.map((item: MenuItem) => (
          item.children ? (
            <Collapsible
              key={item.id}
              asChild
              defaultOpen={item.children.some(subItem => pathname.startsWith(subItem.path))}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <button className="flex w-full items-center gap-2">
                      {item.icon && <item.icon className="size-4 shrink-0" />}
                      <span className="truncate">{item.label}</span>
                      <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </button>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1">
                  <SidebarMenuSub>
                    {item.children.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.id}>
                        <Link href={subItem.path} passHref legacyBehavior>
                          <SidebarMenuSubButton asChild>
                            <a className={pathname === subItem.path ? "bg-accent" : ""}>
                              <span className="truncate">{subItem.label}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.id}>
              <Link href={item.path} passHref legacyBehavior>
                <SidebarMenuButton asChild>
                  <a className={pathname === item.path ? "bg-accent" : ""}>
                    {item.icon && <item.icon className="size-4 shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        ))}
      </div>
    </SidebarGroup>
  )
}
