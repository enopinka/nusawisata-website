import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

type Blog = {
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: Date;
};

type BlogsProps = {
    blogs: Blog[];
};

export default function Blog({ blogs }: BlogsProps) {
    return (
        <>
            <AppLayout>
                <div className="bg-custom-cream py-20 text-custom-blue">
                    <div className="mt-20 max-w-6xl mx-auto ">
                        <div className="my-4 space-y-2">
                            <p className="text-4xl font-montserrat font-bold">
                                Blogs
                            </p>
                            <p className="font-jost  text-custom-blue text-lg">
                                Temukan berbagai artikel informatif, tips
                                perjalanan, dan cerita seru seputar destinasi
                                wisata terbaik dari kami.
                            </p>
                        </div>
                        <div>
                            {blogs.map((blog) => (
                                <div key={blog.id}>
                                    <Link href={`/blog/${blog.slug}`}>
                                        <div className="w-full flex gap-4 h-32 justify-start items-center">
                                            <div>
                                                <img
                                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                                    className="w-32 h-auto rounded-lg"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-2xl font-semibold">
                                                    {blog.title}
                                                </p>
                                                <p>
                                                    {new Date(
                                                        blog.created_at
                                                    ).toLocaleString("id-ID", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <hr />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
