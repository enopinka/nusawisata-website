import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AdminDashboard from "@/Layouts/AdminDashboardLayout";
import { Link } from "@inertiajs/react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

type Blog = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user_id: number;
};

type BlogsProps = {
    blogs: Blog[];
};

export default function Blogs({ blogs }: BlogsProps) {
    console.log(blogs);
    return (
        <>
            <AdminDashboard>
                <p>Ini halaman blogs</p>
                <Button>
                    <Link
                        href="/admin/blog/create"
                        className="flex gap-2 items-center"
                    >
                        <Plus />
                        Create New Blog
                    </Link>
                </Button>
                <div className="">
                    <Table className="w-full ">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Terakhir Diedit</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs === undefined ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : blogs.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>{blog.id}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.updated_at}</TableCell>
                                        <TableCell>
                                            <button>
                                                <Eye />
                                            </button>
                                            <button>
                                                <Pencil />
                                            </button>
                                            <button>
                                                <Trash2 />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </AdminDashboard>
        </>
    );
}
