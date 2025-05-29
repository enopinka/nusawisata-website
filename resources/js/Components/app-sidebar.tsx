import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link, router } from "@inertiajs/react";
import {
    CarIcon,
    HomeIcon,
    LogOut,
    NotebookPenIcon,
    TreePalmIcon,
} from "lucide-react";

const items = [
    {
        title: "Home",
        url: "/admin/dashboard",
        icon: HomeIcon,
    },
    {
        title: "Blog",
        url: "/admin/blog",
        icon: NotebookPenIcon,
    },
    {
        title: "Paket Wisata",
        url: "/admin/tour",
        icon: TreePalmIcon,
    },
    {
        title: "Sewa Kendaraan",
        url: "/admin/rent",
        icon: CarIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="w-64">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Nusa Wisata Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* menus */}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* logout */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => router.post("/admin/logout")}
                                    className="flex items-center"
                                >
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
