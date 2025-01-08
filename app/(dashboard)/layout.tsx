'use client';

import { Suspense } from "react"
import { SidebarSkeleton } from "@/shared/dashboard/components/sidebar-skeleton"
import { AppSidebar } from "@/shared/dashboard/components/app-sidebar"
import { 
  SidebarInset, 
  SidebarTrigger,
  SidebarProvider
} from "shared/components/ui/sidebar"
import { Separator } from "shared/components/ui/separator"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
} from "shared/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { useBreadcrumb } from 'shared/hooks/useBreadcrumb';
import { AuthGuard } from '@/shared/auth/guards/auth-guard';

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebar />
          </Suspense>
          <SidebarInset >
            <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {useBreadcrumb().map((item, index) => (
                      <BreadcrumbItem key={index}>
                        {!item.isCurrentPage ? (
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0" >
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}