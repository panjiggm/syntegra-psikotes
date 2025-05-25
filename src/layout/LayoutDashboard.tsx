import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

// Mapping untuk breadcrumb
const breadcrumbMap: Record<string, { title: string; href?: string }> = {
  "/dashboard": { title: "Dashboard" },
  "/participants": { title: "Manajemen Peserta" },
  "/reports": { title: "Laporan & Hasil" },
  "/modules": { title: "Modul Psikotes" },
  "/sessions": { title: "Sesi & Waktu" },
  "/settings": { title: "Pengaturan Sistem" },
};

const LayoutDashboard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Handle dynamic routes
  const getBreadcrumb = () => {
    if (pathname.startsWith("/participants/") && pathname !== "/participants") {
      // This is a participant detail page
      return {
        parent: { title: "Manajemen Peserta", href: "/participants" },
        current: { title: "Detail Peserta" },
      };
    }

    return {
      current: breadcrumbMap[pathname],
    };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Sistem Psikotes
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumb.parent && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={breadcrumb.parent.href}>
                          {breadcrumb.parent.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                  {breadcrumb.current && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {breadcrumb.current.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="container mx-auto max-w-7xl px-4 py-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default LayoutDashboard;
