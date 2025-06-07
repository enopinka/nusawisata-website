import Tiptap from "@/Components/editor/Tiptap";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RentPackage = {
    id_kendaraan: number;
    title: string;
    description: string;
    price: number;
    image: string;
    id_jenis_kendaraan: number;
    created_at: Date;
};

type RentPackagesProps = {
    id_jenis_kendaraan: number;
    title: string;
    description: string;
    rent_packages: RentPackage[];
};

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
    price: z.coerce.number().min(1000, {
        message: "Price must be at least 1000.",
    }),
    image: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
            message: "The profile picture must be a maximum of 10MB.",
        })
        .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
            message: "Only images are allowed to be sent.",
        }),
});

export default function RentDetail({
    id_jenis_kendaraan,
    title,
    description,
    rent_packages,
}: RentPackagesProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            image: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price.toString());
        formData.append("id_jenis_kendaraan", id_jenis_kendaraan.toString());
        if (values.image) {
            formData.append("image", values.image);
        }
        router.post("/admin/rent/add-package", formData, {
            onSuccess: () => {
                console.log("berhasil menambahkan paket baru");
                setDialogOpen(false);
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }

    return (
        <AdminLayout>
            <div className="w-full px-4 ">
                <div className="">
                    <p className="text-2xl font-semibold">{title}</p>
                    <p className="text-lg ">{description}</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setDialogOpen(true)}>
                            <Plus /> Tambah Paket
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Tambah Paket</DialogTitle>
                            <DialogDescription>
                                Silakan tambahkan paket baru sesuai kebutuhan
                                Anda.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit, (e) => {
                                    console.log("VALIDATION ERROR", e); // tambahkan ini
                                })}
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
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Harga</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="picture">
                                                Gambar
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="picture"
                                                    type="file"
                                                    {...form.register("image")}
                                                />
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
                                            <FormControl className="h-48 max-h-48 overflow-y-auto">
                                                <Tiptap
                                                    content={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <div className="w-full grid grid-cols-2 gap-4 my-4">
                    {rent_packages.map((item) => (
                        <Card className="p-2" key={item.id_kendaraan}>
                            <div className="flex mb-2">
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.title}
                                    className="w-1/3 h-auto rounded-t-lg"
                                />
                                <CardHeader>
                                    <CardTitle className="hover:underline">
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription
                                        dangerouslySetInnerHTML={{
                                            __html: item.description,
                                        }}
                                    ></CardDescription>
                                </CardHeader>
                            </div>
                            <div className="flex justify-end gap-4">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-white hover:bg-gray-200 border border-gray-200 text-red-600">
                                            Hapus
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Apakah Anda Yakin?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Anda akan menghapus paket{" "}
                                                {item.title} ini. Tindakan ini
                                                tidak dapat dibatalkan.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Batalkan
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Button
                                                    onClick={() =>
                                                        router.delete(
                                                            `/admin/rent/package/${item.id_kendaraan}`
                                                        )
                                                    }
                                                    className="bg-red-600 text-white"
                                                >
                                                    Hapus
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Button
                                    onClick={() => setDialogOpen(true)}
                                    className="bg-white hover:bg-gray-200 border border-gray-200 text-blue-600"
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
