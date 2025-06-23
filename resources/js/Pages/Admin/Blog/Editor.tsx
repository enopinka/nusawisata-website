import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { router } from "@inertiajs/react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    content: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
});

type EditProps = {
    blog?: {
        title?: string;
        content?: string;
        id?: number;
    };
};

export default function Editor({ blog }: EditProps) {
    console.log(blog?.title);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: blog?.title ? blog.title : "",
            content: blog?.content ? blog.content : "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(blog);

        if (blog) {
            router.put(`/admin/blog/edit/${blog.id}`, values, {
                onSuccess: () => {
                    console.log("berhasil mengedit");
                },
            });
        } else {
            router.post("/admin/blog/create", values, {
                onSuccess: () => {
                    console.log("berhasil menambahkan blog baru");
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
                                    <FormLabel>title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>content</FormLabel>
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
                        <Button type="submit">{blog ? "Edit" : "Kirim"}</Button>
                    </form>
                </Form>
            </AdminLayout>
        </>
    );
}
