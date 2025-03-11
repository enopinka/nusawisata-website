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
    edited_at: Date;
};

type BlogsProps = {
    blogs: Blog[];
};

export default function Blog({ blogs }: BlogsProps) {
    return (
        <>
            <AppLayout>
                <div className="mt-20 max-w-2xl mx-auto">
                    <p className="my-8 text-5xl">Blogs</p>
                    <div className="grid grid-cols-3 gap-4">
                        {blogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`}>
                                <Card className="hover:shadow-md ">
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                        className="w-full rounded-t-lg"
                                    />
                                    <CardHeader>
                                        <CardTitle className="hover:underline">
                                            {blog.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {blog.content.substring(0, 100)}...
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
