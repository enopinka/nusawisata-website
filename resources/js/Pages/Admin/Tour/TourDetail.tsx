import Tiptap from "@/Components/editor/Tiptap";
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
import { toast } from "sonner";
import { z } from "zod";

type TourPackage = {
    id_jenis_layanan: number;
    title: string;
    description: string;
    price: number;
    image: string;
    created_at: Date;
};

type TourPackagesProps = {
    id_destinasi: number;
    title: string;
    description: string;
    tour_packages: TourPackage[];
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

export default function TourDetail({
    id_destinasi,
    title,
    description,
    tour_packages,
}: TourPackagesProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    console.log(id_destinasi);
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
        console.log(id_destinasi.toString());

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formdata = new FormData();
        formdata.append("title", values.title);
        formdata.append("description", values.description);
        formdata.append("price", values.price.toString());
        formdata.append("id_destinasi", id_destinasi.toString());
        if (values.image) {
            formdata.append("image", values.image);
        }
        for (const pair of formdata.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        router.post("/admin/tour/package", formdata, {
            onSuccess: () => {
                toast.success("berhasil menambahkan paket baru");
                setDialogOpen(false);
                form.reset();
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }

    return (
        <>
            <AdminLayout>
                <div>
                    <div className="">
                        <p className="text-2xl font-semibold">{title}</p>
                        <p className="text-lg ">{description}</p>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                {" "}
                                <Plus /> Tambah Paket Wisata
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Tambah Paket</DialogTitle>
                                <DialogDescription>
                                    Silakan tambahkan paket baru sesuai
                                    kebutuhan Anda.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-2"
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
                                                        {...form.register(
                                                            "image"
                                                        )}
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
                                                        onChange={
                                                            field.onChange
                                                        }
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
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                    {tour_packages.map((item) => (
                        <Card className="p-2" key={item.id_jenis_layanan}>
                            <div className="flex mb-2">
                                {" "}
                                <img
                                    src={
                                        item.image
                                            ? `/storage/${item.image}`
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU"
                                    }
                                    alt={item.title}
                                    className="w-1/3 h-auto rounded"
                                />
                                <CardHeader className="flex flex-col items-start">
                                    <CardTitle className="">
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription
                                        dangerouslySetInnerHTML={{
                                            __html: item.description,
                                        }}
                                    ></CardDescription>
                                </CardHeader>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="mx-2">
                                    <p>Harga mulai dari</p>
                                    <p className="text-xl font-semibold ">
                                        Rp {item.price}
                                    </p>
                                </div>
                                <div className=" flex gap-4">
                                    {" "}
                                    <Button
                                        className="bg-white border border-gray-200 hover:bg-gray-200 text-blue-600"
                                        onClick={() =>
                                            router.delete(
                                                `/admin/tour-package/delete/${item.id_jenis_layanan}`
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="bg-white border border-gray-200 hover:bg-gray-200 text-red-600"
                                        onClick={() =>
                                            router.delete(
                                                `/admin/tour/package/${item.id_jenis_layanan}`
                                            )
                                        }
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </AdminLayout>
        </>
    );
}
