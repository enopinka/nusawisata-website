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
                    <div className="mt-20 max-w-6xl mx-auto">
                    
                        <div className="my-4 space-y-2 text-center">
                            <p className="text-4xl font-montserrat font-bold">
                                Blogs
                            </p>
                            <p className="font-jost text-custom-blue text-lg">
                                Temukan berbagai artikel informatif, tips
                                perjalanan, dan cerita seru seputar destinasi
                                wisata terbaik dari kami.
                            </p>
                        </div>

                        
                        <div className="bg-custom-blue text-white p-8 rounded-lg mb-12">
                            <img
                                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                className="w-full h-64 object-cover rounded-lg mb-6"
                                alt="Featured Blog"
                            />
                            <h2 className="text-3xl font-bold mb-4">
                                Ikan Pari terdampar di Karimun Jawa
                            </h2>
                            <p className="text-lg">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut eget pharetra nulla, ac
                                porta urna. Suspendisse posuere eu nulla nec
                                eleifend. Duis lectus enim, ultrices quis mi
                                molestie, tincidunt condimentum est.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-6">
                                Informasi terbaru
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {blogs.slice(0, 3).map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="bg-white shadow-md rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                            className="w-full h-40 object-cover"
                                            alt={blog.title}
                                        />
                                        <div className="p-4">
                                            <h4 className="text-xl font-semibold mb-2">
                                                {blog.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {new Date(
                                                    blog.created_at
                                                ).toLocaleString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                {blog.content.slice(0, 100)}...
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6">
                                Berita Lainnya
                            </h3>
                            <div className="space-y-6">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="flex gap-4 items-center"
                                    >
                                        <img
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                            className="w-32 h-32 object-cover rounded-lg"
                                            alt={blog.title}
                                        />
                                        <div>
                                            <h4 className="text-xl font-semibold">
                                                {blog.title}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(
                                                    blog.created_at
                                                ).toLocaleString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}