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
            <div className="mt-16">
                <p>{blog.title}</p>
                <p>{blog.content}</p>
            </div>
        </AppLayout>
    );
}
