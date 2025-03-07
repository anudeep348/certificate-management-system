"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Award,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";

function AppSideBar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Courses",
      icon: GraduationCap,
      href: "/courses",
    },
    {
      title: "Recipients",
      icon: Users,
      href: "/recipients",
    },
    {
      title: "Certificates",
      icon: Award,
      href: "/certificates",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2 mb-4">
        <div className="flex items-center gap-2 py-4">
          <Award className="h-6 w-6" />
          <span className="text-lg font-bold">CertifyPro</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className="text-base mb-3 p-2"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4">
        <SidebarMenu>
          <SidebarMenuItem className="mb-2 cursor-pointer">
            <SidebarMenuButton asChild>
              <SignOutButton redirectUrl="/signin">
                <Button size="sm" variant={"signout"}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </SignOutButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="text-sm">
            &copy; certifypro {new Date().getFullYear()}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
