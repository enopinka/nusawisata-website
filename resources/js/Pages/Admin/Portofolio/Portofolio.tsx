import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@headlessui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { EllipsisVertical, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

type portofolio = {
    id_portofolio: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
};
type PortofolioProps = {
    portofolios: portofolio[];
};

export default function Portofolio({ portofolios }: PortofolioProps) {
    const props = usePage().props;
    useEffect(() => {
        if (props.success) {
            toast.success("yeay");
        }
    }, [props.success]);

    return (
        <AdminLayout>
            <Button className="">
                <Link
                    href="/admin/portofolio/create"
                    className="flex gap-2 items-center"
                >
                    <Plus /> Tambah Portofolio
                </Link>
            </Button>
            <div className="my-4">
                <p className="text-lg font-montserrat font-semibold">
                    Portofolio
                </p>
            </div>
            {portofolios.length > 0 ? (
                portofolios.map((portofolio) => (
                    <Card className="flex my-4" key={portofolio.id_portofolio}>
                        <div className="p-4 w-64 h-auto">
                            <img
                                src={`/storage/${portofolio.image}`}
                                alt={portofolio.title}
                            />
                        </div>
                        <div className="flex w-full justify-between items-start">
                            <div>
                                <CardHeader>
                                    <CardTitle>{portofolio.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: portofolio.description,
                                        }}
                                    ></div>
                                </CardContent>
                            </div>
                            <div className="m-8 border-none">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="border-none">
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            Opsi
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem
                                                    onSelect={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    Hapus
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Yakin ingin menghapus?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan akan menghapus
                                                        seluruh isi paket dan
                                                        tidak dapat dikembalikan
                                                        lagi.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Batal
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            router.delete(
                                                                `/admin/portofolio/${portofolio.id_portofolio}`
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <p>Tidak ada protofolio</p>
            )}
        </AdminLayout>
    );
}
