import Tiptap from "@/Components/editor/Tiptap";
import { Button } from "@/components/ui/button";
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { Pen, Pencil, Plus, Trash, Trash2 } from "lucide-react";
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

    console.log(tours);

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
        console.log(values);

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

    return (
        <>
            <AdminLayout>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                                    <Button type="submit">Submit</Button>
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
                                    <Link href="#">
                                        <Trash2 />
                                    </Link>
                                    <Link href="#">
                                        <Pencil />
                                    </Link>
                                </div>
                            </CardHeader>
                            {tour.tour_packages.length > 0 ? (
                                tour.tour_packages.map((tour_package) => (
                                    <CardContent key={tour_package.id}>
                                        <hr />
                                    </CardContent>
                                ))
                            ) : (
                                <CardContent>
                                    <p className="text-slate-500 text-center">
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
