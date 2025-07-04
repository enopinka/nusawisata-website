import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

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

const PAGE_SIZE = 8; // 4 columns x 2 rows

export default function Blog({ blogs }: BlogsProps) {
    const [page, setPage] = useState(1);

    // Pagination logic
    const startIdx = (page - 1) * PAGE_SIZE + 4; // skip first 4 (featured + terbaru)
    const paginatedBlogs = blogs.slice(startIdx, startIdx + PAGE_SIZE);
    const totalPages = Math.ceil((blogs.length - 4) / PAGE_SIZE);

    return (
        <AppLayout>
            <div className="bg-custom-cream py-20 text-custom-blue min-h-screen">
                <div className="mt-20 max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
                    <div className="my-4 space-y-2">
                        <p className="text-4xl font-montserrat font-bold">
                            Blogs
                        </p>
                        <p className="font-jost text-custom-blue text-lg">
                            Temukan berbagai artikel informatif, tips
                            perjalanan, dan cerita seru seputar destinasi wisata
                            terbaik dari kami.
                        </p>
                    </div>

                    {/* Featured Blog */}
                    {blogs[0] && (
                        <div className="bg-custom-blue text-white shadow-lg rounded-2xl p-8 mb-12">
                            <h3 className="text-2xl font-bold mb-6">
                                Informasi terbaru
                            </h3>
                            <Link
                                href={`/blog/${blogs[0].slug}`}
                                className="block p-8 rounded-lg mb-12 transition hover:scale-[1.01]"
                            >
                                <img
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                    alt={blogs[0].title}
                                />
                                <h2 className="text-3xl font-bold mb-4">
                                    {blogs[0].title}
                                </h2>

                                <div
                                    className="text-lg"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            blogs[0].content.slice(0, 150) +
                                            "....",
                                    }}
                                />
                            </Link>

                            {/* Informasi Terbaru */}
                            <div className="mt-12 mb-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {blogs.slice(1, 4).map((blog) => (
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            key={blog.id}
                                            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-[1.01] transition block"
                                        >
                                            <img
                                                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                                className="w-full h-40 object-cover"
                                                alt={blog.title}
                                            />
                                            <div className="p-4">
                                                <h4 className="text-xl text-black font-semibold mb-2">
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
                                                <span className="text-gray-700 text-sm flex text-justify">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                blog.content.slice(
                                                                    0,
                                                                    150
                                                                ) + "....",
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Berita Lainnya */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6">
                            Berita Lainnya
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {paginatedBlogs.map((blog) => (
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    key={blog.id}
                                    className="flex flex-col bg-white rounded-lg shadow hover:scale-[1.01] transition"
                                >
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                        className="w-full h-32 object-cover rounded-t-lg"
                                        alt={blog.title}
                                    />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h4 className="text-base font-semibold mb-2 line-clamp-2">
                                            {blog.title}
                                        </h4>
                                        <p className="text-xs text-gray-600 mb-2">
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>

                                        <p className="text-sm text-gray-700 line-clamp-3 flex-1 text-justify">
                                            {stripHtml(blog.content).slice(
                                                0,
                                                150
                                            ) + "..."}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    className="px-3 py-1 rounded bg-custom-blue text-white font-bold disabled:opacity-50"
                                    onClick={() =>
                                        setPage((p) => Math.max(1, p - 1))
                                    }
                                    disabled={page === 1}
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`px-3 py-1 rounded font-bold ${
                                            page === i + 1
                                                ? "bg-custom-blue text-white"
                                                : "bg-white text-custom-blue border"
                                        }`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-3 py-1 rounded bg-custom-blue text-white font-bold disabled:opacity-50"
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(totalPages, p + 1)
                                        )
                                    }
                                    disabled={page === totalPages}
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
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
