import Tiptap from "@/Components/editor/Tiptap";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
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

type TourPackagesProps = {
    id: number;
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
    id: z.coerce.number(),
});

export default function TourDetail({
    id,
    title,
    description,
    tour_packages,
}: TourPackagesProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            id: id,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        router.post("/admin/tour/add-package", values, {
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
                <div className="grid grid-cols-3 gap-4 my-4">
                    {tour_packages.map((item) => (
                        <Card className="" key={item.id}>
                            <img
                                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                className="w-full rounded-t-lg"
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
                        </Card>
                    ))}
                </div>
            </AdminLayout>
        </>
    );
}
