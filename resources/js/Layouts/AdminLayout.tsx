import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import React from "react";

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SidebarProvider>
                <div className="flex h-screen">
                    <AppSidebar />
                    <main className="flex-1">
                        <SidebarTrigger />
                        <div className=" mx-8 w-[1080px]">{children}</div>
                    </main>
                </div>
            </SidebarProvider>
        </>
    );
}
