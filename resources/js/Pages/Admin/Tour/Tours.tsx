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

type TourPackage = {
    id: number;
    title: string;
    description: string;
    price: number;
    created_at: Date;
};

type Tour = {
    id: number;
    title: string;
    description: string;
    tour_packages: TourPackage[];
};

type ToursProps = {
    tours: Tour[];
};

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
});

export default function Tours({ tours }: ToursProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
            router.put(`/admin/tour/edit/${editId}`, values, {
                onSuccess: () => {
                    console.log("berhasil menyunting tour");
                    setDialogOpen(false);
                    setEditId(null);
                },
            });
        } else {
            router.post("/admin/tour/create", values, {
                onSuccess: () => {
                    console.log("berhasil menambahkan tour baru");
                    setDialogOpen(false);
                },
                onError: (e) => {
                    console.log(e);
                },
            });
        }
    }

    return (
        <>
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
                            <Plus /> Tambah Paket Wisata
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

                <div className="my-4">
                    <p className="text-lg font-montserrat font-semibold">
                        Daftar Paket
                    </p>

                    {tours.map((tour) => (
                        <Card key={tour.id} className="my-2">
                            <CardHeader className="flex flex-row justify-between">
                                <div className="space-y-2">
                                    {" "}
                                    <CardTitle>{tour.title}</CardTitle>
                                    <CardDescription>
                                        {tour.description}
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
                                                        `/admin/tour/${tour.id}`,
                                                    )
                                                }
                                            >
                                                Lihat Detail
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setDialogOpen(true);
                                                    setIsEdit(true);
                                                    setEditId(tour.id);
                                                    form.reset({
                                                        title: tour.title,
                                                        description:
                                                            tour.description,
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
                                                                    `/admin/tour/delete/${tour.id}`,
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
                            {tour.tour_packages.length > 0 ? (
                                tour.tour_packages.map((tour_package) => (
                                    <CardContent key={tour_package.id}>
                                        <hr />
                                        <div className="flex justify-between my-4">
                                            <p>{tour_package.title}</p>
                                            <p>Rp {tour_package.price}</p>
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
                    ))}
                </div>
            </AdminLayout>
        </>
    );
}
