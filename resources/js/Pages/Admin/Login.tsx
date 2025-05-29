import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Toaster } from "@/Components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router, usePage } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z
        .string({ required_error: "Alamat email tidak boleh kosong!" })
        .min(1, { message: "Alamat email tidak boleh kosong!" })
        .email("Alamat email tidak valid!"),
    password: z
        .string({ required_error: "Kata sandi tidak boleh kosong!" })
        .min(1, { message: "Kata sandi tidak boleh kosong!" }),
});

export default function Login() {
    const { errors } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (errors.password)
            toast.error("Terjadi Kesalahan!", {
                description: errors.password,
                position: "top-right",
            });
    }, [errors]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        router.post(route("admin.login"), values, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <>
            <Head title="Autentikasi Admin" />

            <div className="bg-custom-blue h-screen w-full flex items-center">
                <Card className="mx-auto max-w-lg shadow-none">
                    <CardHeader>
                        <CardTitle>Masuk</CardTitle>
                        <CardDescription>
                            Masukkan beberapa informasi berikut untuk mengakses
                            halaman dashboard admin.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Masukkan alamat email"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kata Sandi</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        {...field}
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="flex-1"
                                                        placeholder="Masukkan kata sandi"
                                                    />

                                                    <Button
                                                        size={"icon"}
                                                        variant={"secondary"}
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) => !prev,
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOffIcon />
                                                        ) : (
                                                            <EyeIcon />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full justify-end">
                            <Button
                                onClick={() => form.handleSubmit(onSubmit)()}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Loader2Icon className="animate-spin" />
                                )}
                                Masuk
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <Toaster richColors theme="light" />
        </>
    );
}
