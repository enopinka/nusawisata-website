import Tiptap from "@/Components/editor/Tiptap";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Toaster } from "@/Components/ui/toaster";
import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type EditProps = {
    portofolio?: {
        title?: string;
        description?: string;
        picture?: FileList;
        id_portofolio?: number;
    };
};

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
    picture: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
            message: "The profile picture must be a maximum of 10MB.",
        })
        .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
            message: "Only images are allowed to be sent.",
        }),
});

export default function PortofolioEditor({ portofolio }: EditProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: portofolio ? portofolio?.title : "",
            description: portofolio ? portofolio?.description : "",
            picture: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        if (values.picture) {
            formData.append("picture", values.picture);
        }
        if (portofolio) {
            formData.append("_method", "PUT");

            router.post(
                `/admin/portofolio/${portofolio.id_portofolio}`,
                formData,
                {
                    onSuccess: () => {
                        toast.success("Event berhasil diperbarui");
                        console.log("Event berhasil diperbarui");
                    },
                    onError: (e) => {
                        toast.error("Gagal memperbarui event");
                        console.log(e);
                    },
                }
            );
        } else {
            router.post("/admin/portofolio/create", formData, {
                onSuccess: () => {
                    toast.success("Berhasil membuat portofolio baru");
                    console.log("Berhasil membuat portofolio baru");
                },
                onError: (e) => {
                    toast.error("Gagal membuat portofolio baru");
                    console.log(e);
                },
            });
        }
    }

    return (
        <AdminLayout>
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
                        name="picture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="picture">Gambar</FormLabel>
                                <FormControl>
                                    <Input
                                        id="picture"
                                        type="file"
                                        {...form.register("picture")}
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
                                <FormControl>
                                    <Tiptap
                                        content={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {portofolio ? "Edit" : "Buat"}
                    </Button>
                </form>
            </Form>
        </AdminLayout>
    );
}
