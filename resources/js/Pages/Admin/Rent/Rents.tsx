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
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { EllipsisVertical, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RentPackage = {
    id: number;
    title: string;
    description: string;
    price: number;
    created_at: Date;
};

type Rent = {
    id: number;
    title: string;
    description: string;
    rent_packages: RentPackage[];
};

type RentsProps = {
    rents: Rent[];
};

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
});

export default function Rents({ rents }: RentsProps) {
    console.log(rents);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (isEdit && editId !== null) {
            router.put(`/admin/rent/edit/${editId}`, values, {
                onSuccess: () => {
                    console.log("berhasil menyunting rental");
                    setDialogOpen(false);
                    setEditId(null);
                },
            });
        } else {
            router.post("/admin/rent/create", values, {
                onSuccess: () => {
                    console.log("berhasil menambahkan rental baru");
                    setDialogOpen(false);
                },
                onError: (e) => {
                    console.log(e);
                },
            });
        }
    }

    return (
        <AdminLayout>
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        setIsEdit(false);
                        setEditId(null);
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button>
                        {" "}
                        <Plus /> Tambah Paket
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Kelompok Paket</DialogTitle>
                        <DialogDescription>
                            Silakan tambahkan kelompok paket baru sesuai
                            kebutuhan Anda.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Judul</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">
                                    {isEdit ? "Edit" : "Buat"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <div>
                <p className="text-lg font-montserrat font-semibold my-4">
                    Daftar Paket Sewa Kendaraan
                </p>
                {rents.length > 0 ? (
                    rents.map((rent) => (
                        <Card key={rent.id} className="my-2">
                            <CardHeader className="flex flex-row justify-between">
                                <div className="space-y-2">
                                    {" "}
                                    <CardTitle>{rent.title}</CardTitle>
                                    <CardDescription>
                                        {rent.description}
                                    </CardDescription>
                                </div>

                                <div className="flex gap-2 items-center justify-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="border-none">
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                Opsi
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    router.get(
                                                        `/admin/rent/${rent.id}`,
                                                    )
                                                }
                                            >
                                                Lihat Detail
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setDialogOpen(true);
                                                    setIsEdit(true);
                                                    setEditId(rent.id);
                                                    form.reset({
                                                        title: rent.title,
                                                        description:
                                                            rent.description,
                                                    });
                                                }}
                                            >
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
                                                            Yakin ingin
                                                            menghapus?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan akan
                                                            menghapus seluruh
                                                            isi paket dan tidak
                                                            dapat dikembalikan
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
                                                                    `/admin/rent/delete/${rent.id}`,
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
                            </CardHeader>
                            {rent.rent_packages.length > 0 ? (
                                rent.rent_packages.map((rent_package) => (
                                    <CardContent key={rent_package.id}>
                                        <hr />
                                        <div className="flex justify-between my-4">
                                            <p>{rent_package.title}</p>
                                            <p>Rp {rent_package.price}</p>
                                        </div>
                                    </CardContent>
                                ))
                            ) : (
                                <CardContent>
                                    <hr />
                                    <p className="text-slate-500 text-center my-4">
                                        Tidak ada paket
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    ))
                ) : (
                    <div>Tidak ada paket Tersedia</div>
                )}
            </div>
        </AdminLayout>
    );
}
