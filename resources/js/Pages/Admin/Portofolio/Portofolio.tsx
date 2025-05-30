import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

type portofolio = {
    id: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
};
type PortofolioProps = {
    portofolio: portofolio[];
};

export default function Portofolio({ portofolio }: PortofolioProps) {
    const props = usePage().props;
    useEffect(() => {
        if (props.success) {
            toast.success("yeay");
        }
    }, [props.success]);

    return (
        <AdminLayout>
            <Button className="">
                <Link
                    href="/admin/portofolio/create"
                    className="flex gap-2 items-center"
                >
                    <Plus /> Tambah Portofolio
                </Link>
            </Button>
            <div className="my-4">
                <p className="text-lg font-montserrat font-semibold">
                    Portofolio
                </p>
            </div>
        </AdminLayout>
    );
}
