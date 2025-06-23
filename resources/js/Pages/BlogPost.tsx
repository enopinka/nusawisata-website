import AppLayout from "@/Layouts/AppLayout";

type Blog = {
    id: number;
    title: string;
    slug: string;
    content: string;
    edited_at: Date;
};

type BlogPost = {
    blog: Blog;
};

export default function BlogPost({ blog }: BlogPost) {
    return (
        <AppLayout>
            <div className="pt-32 pb-16 bg-custom-cream min-h-screen">
                <div className="max-w-6xl mx-auto py-2 space-y-4">
                    <img
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                        className="w-full h-[50vh] object-cover rounded-lg"
                    />
                    <p className="font-montserrat text-4xl font-semibold">
                        {blog.title}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </div>
        </AppLayout>
    );
}
