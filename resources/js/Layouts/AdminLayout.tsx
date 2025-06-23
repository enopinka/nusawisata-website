import { AppSidebar } from "@/Components/app-sidebar";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { SidebarProvider, useSidebar } from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import React from "react";
import { IntlProvider } from "react-intl";

export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1 relative">
                        {/* navbar */}
                        <div className="bg-background h-16 w-full z-10 border-b">
                            <div className="flex items-center h-16 max-w-5xl mx-auto gap-2">
                                <SidebarToggleButton />
                                <Separator
                                    orientation="vertical"
                                    className="h-8 mr-2"
                                />
                                <Label>Nusa Wisata</Label>
                            </div>
                        </div>
                        <div className="mx-auto max-w-5xl w-full p-6">
                            <IntlProvider locale="id">{children}</IntlProvider>
                        </div>
                    </main>
                </div>
            </SidebarProvider>

            <Toaster richColors theme="light" />
        </>
    );
}

const SidebarToggleButton = () => {
    const { toggleSidebar, open } = useSidebar();

    return (
        <>
            <Button variant={"ghost"} size={"icon"} onClick={toggleSidebar}>
                {open ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
            </Button>
        </>
    );
};
