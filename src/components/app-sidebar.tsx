"use client";

import * as React from "react";
import {
  BarChart3,
  Users,
  Brain,
  Settings,
  FileText,
  Clock,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Data untuk sistem psikotes
const data = {
  user: {
    name: "Admin Demo",
    email: "admin@syntegra-services.com",
    avatar: "/images/syntegra-logo.jpg",
  },
  company: {
    name: "Syntegra Services",
    subTitle: "Sistem Psikotes Digital",
    logo: "/images/syntegra-logo.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Manajemen Peserta",
      url: "/participants",
      icon: Users,
    },
    {
      title: "Laporan & Hasil",
      url: "/reports",
      icon: FileText,
    },
    {
      title: "Modul Psikotes",
      url: "/modules",
      icon: Brain,
      items: [
        {
          title: "Semua Modul",
          url: "/modules",
        },
        {
          title: "Template Modul",
          url: "/templates",
        },
      ],
    },
    {
      title: "Sesi & Waktu",
      url: "/sessions",
      icon: Clock,
      items: [
        {
          title: "Pengaturan Durasi",
          url: "/sessions/duration",
        },
        {
          title: "Jadwal Tes",
          url: "/sessions/schedule",
        },
        {
          title: "Sesi Aktif",
          url: "/sessions/active",
        },
        {
          title: "Riwayat Sesi",
          url: "/sessions/history",
        },
      ],
    },

    {
      title: "Pengaturan Sistem",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher company={data.company} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
