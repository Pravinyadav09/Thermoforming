"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { SyncQueue } from "./sync-queue";
import { modules } from "@/lib/modules";

export function AppSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { setOpenMobile, isMobile, state } = useSidebar();
    const isCollapsed = state === "collapsed";

    // If no user is logged in, return null (content will be hidden, usually redirected to login)
    if (!user) return null;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-14 flex items-center justify-between px-4 border-b">
                <div className="flex items-center gap-2 font-bold text-lg text-primary overflow-hidden">
                    <Icons.logo className="h-6 w-6 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">Indus ERP</span>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {modules.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.name}
                                        isActive={pathname === item.path}
                                        onClick={() => isMobile && setOpenMobile(false)}
                                    >
                                        <Link href={item.path}>
                                            <item.icon className={`h-4 w-4 ${item.color}`} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className={`flex items-center gap-3 px-2 py-2 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="flex flex-col truncate">
                                    <span className="text-xs font-bold truncate leading-tight">{user.name}</span>
                                    <span className="text-[10px] text-muted-foreground truncate capitalize">{user.role?.replace(/_/g, " ")}</span>
                                </div>
                            )}
                        </div>
                    </SidebarMenuItem>

                    {/* Show SyncQueue for enabled roles */}
                    {(user?.role === 'service_engineer' || user?.role === 'senior_sales_rep' || user?.role === 'super_admin') && !isCollapsed && (
                        <div className="px-2 pb-2">
                            <SyncQueue />
                        </div>
                    )}

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
                            onClick={logout}
                            tooltip="Logout"
                        >
                            <Icons.logout className="h-4 w-4" />
                            {!isCollapsed && <span>Logout</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
