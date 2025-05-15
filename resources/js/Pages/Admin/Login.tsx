import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { AlertCircle, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    const [password, setPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(!!errors.password);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.post(route("admin.login"), values, {
            onSuccess: () => {
                console.log("berhasil login");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    };
    return (
        <>
            {showAlert && errors.password && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-2xl w-full">
                    <Alert
                        variant="destructive"
                        className="flex justify-between items-center"
                    >
                        <div className="flex gap-4 items-center">
                            <AlertCircle className="h-4 w-4" />
                            <div>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {errors.password}
                                </AlertDescription>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowAlert(false)}
                            >
                                <X />
                            </button>
                        </div>
                    </Alert>
                </div>
            )}
            <div className="flex justify-center font-montserrat h-screen items-center">
                <Card className="max-w-2xl w-full p-6 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                    </CardHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={
                                                        password
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPassword(!password)
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                >
                                                    {password ? (
                                                        <EyeOff size={20} />
                                                    ) : (
                                                        <Eye size={20} />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex justify-end">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    );
}
