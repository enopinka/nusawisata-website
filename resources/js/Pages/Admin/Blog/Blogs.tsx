import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Edit2Icon, MoreVerticalIcon, PenIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { toast } from "sonner";

interface Props {
    data: {
        id: number;
        title: string;
        slug: string;
        created_at: string;
        updated_at: string;
        image: string;
        content: string;
    }[];
    current_page: number;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
}

export default function Blogs(props: Props) {
    console.log({ props });

    const [dialogDeleteState, setDialogDeleteState] = useState<{
        open: boolean;
        data?: { id: number; title: string };
    }>({ open: false });

    return (
        <>
            <Head title="Blogs" />
            <AdminLayout>
                <div className="space-y-1 flex-1">
                    <p className="text-3xl font-semibold">Blogs</p>
                    <p className="text-muted-foreground">
                        Berikut merupakan daftar blog yang tersedia. Anda dapat
                        menambahkan, mengedit, atau menghapus konten sesuai
                        dengan kebutuhan pengelolaan.
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button className="my-4">
                        <Link
                            href="/admin/blog/create"
                            className="flex gap-2 items-center"
                        >
                            <PenIcon />
                            Blog baru
                        </Link>
                    </Button>
                </div>

                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul Blog</TableHead>
                            <TableHead>Tanggal Dibuat</TableHead>
                            <TableHead>Terakhir Diubah</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* empty state */}
                        {props.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    className="text-center py-4 text-muted-foreground"
                                    colSpan={3}
                                >
                                    Belum ada blog yang dibuat.
                                </TableCell>
                            </TableRow>
                        )}

                        {/* success state */}
                        {props.data.length > 0 &&
                            props.data.map((item, index) => (
                                <ListItemBlog
                                    key={"blog-item-" + index}
                                    {...item}
                                    onClickDelete={() =>
                                        setDialogDeleteState({
                                            open: true,
                                            data: {
                                                title: item.title,
                                                id: item.id,
                                            },
                                        })
                                    }
                                />
                            ))}
                    </TableBody>
                </Table>

                <Pagination className="mt-4">
                    <PaginationContent>
                        {props.links.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={item.url ?? "#"}
                                        />
                                    </PaginationItem>
                                );
                            } else if (index === props.links.length - 1) {
                                return (
                                    <PaginationItem>
                                        <PaginationNext
                                            href={item.url ?? "#"}
                                        />
                                    </PaginationItem>
                                );
                            } else {
                                return (
                                    <PaginationItem>
                                        <PaginationLink
                                            href={item.url ?? "#"}
                                            isActive={item.active}
                                        >
                                            {item.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                        })}
                    </PaginationContent>
                </Pagination>
            </AdminLayout>

            <DeleteBlogDialog
                open={dialogDeleteState.open}
                onOpenChange={() =>
                    setDialogDeleteState({ open: false, data: undefined })
                }
                data={dialogDeleteState.data}
            />
        </>
    );
}

type ListItemBlogProps = Props["data"][number] & {
    onClickDelete?: () => void;
};
const ListItemBlog = (props: ListItemBlogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <div className="flex items-center gap-4">
                        <img src={props.image} className="w-32 rounded" />
                        <div>
                            <p className="font-medium text-foreground">
                                {props.title}
                            </p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <FormattedDate
                        value={props.created_at}
                        day="numeric"
                        weekday="short"
                        month="short"
                        year="2-digit"
                    />
                </TableCell>
                <TableCell>
                    <FormattedDate
                        value={props.updated_at}
                        day="numeric"
                        weekday="short"
                        month="short"
                        year="2-digit"
                    />
                </TableCell>
                <TableCell>
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"} size={"icon"}>
                                <MoreVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href={`/admin/blog/edit/${props.slug}`}>
                                    <Edit2Icon />
                                    Ubah
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setIsOpen(false);
                                    if (props.onClickDelete)
                                        props.onClickDelete();
                                }}
                            >
                                <Trash2Icon />
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </>
    );
};

interface DeleteBlogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data?: {
        id: number;
        title: string;
    };
}
const DeleteBlogDialog = (props: DeleteBlogDialogProps) => {
    const handleDelete = () => {
        const id = props.data?.id;
        if (id)
            router.delete(route("admin.blog.delete", { id }), {
                onSuccess: () =>
                    toast.success("Berhasil!", {
                        description: "Blog berhasil dihapus.",
                        position: "top-right",
                    }),
            });
    };

    return (
        <>
            <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Blog</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin akan menghapus blog{" "}
                            <span className="text-foreground font-medium">
                                {props.data?.title}
                            </span>
                            ? Tindakan yang Anda lakukan tidak dapat dipulihkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
