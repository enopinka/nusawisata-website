import AdminDashboard from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { router } from "@inertiajs/react";
import Tiptap from "@/Components/editor/Tiptap";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    content: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),
});

export default function Create() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        router.post("/admin/blog/create", values, {
            onSuccess: () => {
                console.log("berhasil menambahkan blog baru");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }

    return (
        <>
            <AdminDashboard>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </AdminDashboard>
        </>
    );
}
