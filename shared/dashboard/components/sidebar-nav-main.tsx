'use client';

import { RoleType } from 'shared/permission/types/rbac-types';
import { Separator } from 'shared/components/ui/separator';
import { 
  MenuSection,
  MENU_ITEMS
 } from 'shared/navigation';
import {
  Settings,
  Shield,
  Users,
  Activity,
  AlertTriangle,
  Navigation,
  Building2,
  Users2,
  Box,
  BarChart2,
  DollarSign,
  ListTodo,
  UserPlus
} from 'lucide-react';
import { SidebarMenu } from '@/shared/components/ui/sidebar';

interface SidebarProps {
  role: RoleType;
}

export function SidebarNavMain({ role }: SidebarProps) {
  // Filter and group menu items based on role type
  const adminItems = MENU_ITEMS.filter(item => 
    item.id.match(/^(config|security|users|audit|emergency|navigation)$/)
  );

  const managementItems = MENU_ITEMS.filter(item => 
    item.id.match(/^(department|team|resources|metrics|budget)$/)
  );

  const operationalItems = MENU_ITEMS.filter(item => 
    item.id.match(/^(tasks|collaboration|documents|tools|time)$/)
  );

  const generalItems = MENU_ITEMS.filter(item => 
    item.id.match(/^(knowledge|support|features)$/)
  );

  return (
    <SidebarMenu>
    <div className="flex h-screen w-full flex-col">
        <div className="space-y-2 p-2">
          {adminItems.length > 0 && (
            <>
              <MenuSection
                title="Administration"
                items={adminItems}
                icon={<Settings className="h-4 w-4" />}
                defaultOpen={role === RoleType.ADMIN}
              />
              <Separator />
            </>
          )}
          {managementItems.length > 0 && (
            <>
              <MenuSection
                title="Management"
                items={managementItems}
                icon={<Building2 className="h-4 w-4" />}
                defaultOpen={role === RoleType.MANAGER}
              />
              <Separator />
            </>
          )}
          {operationalItems.length > 0 && (
            <>
              <MenuSection
                title="Operations"
                items={operationalItems}
                icon={<ListTodo className="h-4 w-4" />}
                defaultOpen={role === RoleType.STAFF}
              />
              <Separator />
            </>
          )}
          {generalItems.length > 0 && (
            <MenuSection
              title="General"
              items={generalItems}
              icon={<Box className="h-4 w-4" />}
              defaultOpen={true}
            />
          )}
        </div>
    </div>
    </SidebarMenu>
  );
}