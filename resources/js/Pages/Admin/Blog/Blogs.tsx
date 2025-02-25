import { Button } from "@/Components/ui/button";
import AdminDashboard from "@/Layouts/AdminDashboardLayout";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Blogs() {
    return (
        <>
            <AdminDashboard>
                <p>Ini halaman blogs</p>
                <Button>
                    <Link href="/admin/blog/create">
                        <Plus />
                        Create New Blog
                    </Link>
                </Button>
            </AdminDashboard>
        </>
    );
}
