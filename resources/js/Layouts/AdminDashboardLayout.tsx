import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import React from "react";

export default function AdminDashboard({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <div className="mx-full border-black">{children}</div>
                </main>
            </SidebarProvider>
        </>
    );
}
