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
import { router, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { AlertCircle, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { error } from "console";

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email setidaknya memiliki 2 karater",
    }),
    password: z.string().min(1, {
        message: "Password tidak boleh kosong",
    }),
});

export default function Login() {
    const { errors } = usePage().props;
    const [password, setPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(!!errors.password);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post("/admin/login", values, {
            onSuccess: () => {
                console.log("berhasil login");
            },
            onError: (e) => {
                console.log(e);
            },
        });
    }
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
                                        <FormLabel>email</FormLabel>
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
                                        <FormLabel>Password</FormLabel>
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
