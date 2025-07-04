import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

type Blog = {
    id: number;
    title: string;
    slug: string;
    content: string;
    updated_at: Date;
    image: string;
};

type BlogPost = {
    blog: Blog;
    recommededBlogs: Blog[];
};

export default function BlogPost({ blog, recommededBlogs }: BlogPost) {
    return (
        <AppLayout>
            <div className="pt-32 pb-16 bg-custom-cream min-h-screen">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-montserrat font-bold mb-2">
                            Blogs
                        </h1>
                        <div className="flex gap-3 mb-4">
                            <button className="px-6 py-2 rounded-full border border-custom-blue text-custom-blue font-semibold hover:bg-custom-blue hover:text-white transition">
                                Berita Terbaru
                            </button>
                        </div>
                        <hr className="border-custom-blue" />
                    </div>

                    {/* Featured Image */}
                    <div className="mb-10">
                        <img
                            src={
                                blog.image
                                    ? blog.image
                                    : "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                            }
                            className="w-full h-[340px] md:h-[420px] object-cover rounded-xl"
                            alt={blog.title}
                        />
                    </div>

                    {/* Blog Title */}
                    <h2 className="font-montserrat text-3xl md:text-4xl font-bold ">
                        {blog.title}
                    </h2>
                    {/* blog date */}
                    <p className="text-sm text-gray-600 mb-4">
                        Dibuat tanggal{" "}
                        {new Date(blog.updated_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    {/* Blog Content */}
                    <div className="prose prose-lg max-w-none font-jost text-custom-blue mb-12">
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Divider */}
                    <hr className="border-custom-blue my-12" />

                    {/* Recommendation Section */}
                    <div>
                        <h3 className="font-montserrat text-lg font-bold mb-4">
                            Anda mungkin juga suka
                        </h3>

                        {recommededBlogs && recommededBlogs.length !== 0 ? (
                            recommededBlogs.map((blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className=""
                                >
                                    <div className="flex flex-col md:flex-row gap-4 my-4 hover:text-sky-700">
                                        <div className="flex gap-4 bg-white rounded-xl shadow p-4">
                                            <img
                                                className="w-1/4 h-auto "
                                                src={
                                                    blog.image
                                                        ? blog.image
                                                        : "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                                }
                                            />
                                            <div>
                                                <h4 className="font-bold text-base mb-1">
                                                    {blog.title}
                                                </h4>

                                                <p className="text-xs text-gray-600 mb-2">
                                                    {new Date(
                                                        blog.updated_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {stripHtml(
                                                        blog.content
                                                    ).slice(0, 150) + "..."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>Tidak ada rekomendasi</div>
                        )}
                        {/* <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex gap-4 bg-white rounded-xl shadow p-4">
                                src=
                                {blog.image
                                    ? blog.image
                                    : "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"}
                                <div>
                                    <h4 className="font-bold text-base mb-1">
                                        Bebek ditemukan ‘punah’ di Surabaya
                                        setelah terlihat bersama seekor kucing
                                        yang sedang menggali lubang di Taman
                                        Pancasila
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-2">
                                        27 Juni 2025
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Ut eget pharetra nulla,
                                        ac porta urna. Suspendisse posuere eu
                                        nulla nec eleifend. Duis lectus enim,
                                        ultrices quis mi molestie, tincidunt
                                        condimentum est. Vestibulum ultrices
                                        ipsum dolor, eget scelerisque enim
                                        egestas vel. Nunc ut libero scelerisque,
                                        porta lacus in, tincidunt ante. Sed
                                        vehicula ultricies lectus, at commodo
                                        est suscipit quis. Ut mi nisi, posuere
                                        ut finibus vitae, scelerisque nec felis.
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function stripHtml(html: string): string {
    if (typeof window !== "undefined") {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
    return html.replace(/<[^>]*>?/gm, "");
}
