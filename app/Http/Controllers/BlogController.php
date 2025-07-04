<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::paginate(5);

        return Inertia::render("Admin/Blog/Blogs", $blogs);
    }

    public function createBlogScreen()
    {
        return Inertia::render("Admin/Blog/Editor");
    }

    public function createBlog(Request $request)
    {
        $request->validate([
            "title" => "required|string",
            "content" => "required|string",
        ]);

        Blog::create([
            "title" => $request->title,
            "content" => $request->content,
            "image" => "",
        ]);

        return redirect("/admin/blog")->with(
            "success",
            "Blog baru telah dibuat"
        );
    }

    public function deleteBlog($id)
    {
        $blog = Blog::where("id", $id)->first();

        if (!$blog) {
            return redirect("admin/blog")->with(
                "error",
                "Blog tidak ditemukan"
            );
        }

        $blog->delete();

        return back();
    }

    public function editBlogScreen($slug)
    {
        $blog = Blog::where("slug", $slug)->first();

        return Inertia::render("Admin/Blog/Editor", ["blog" => $blog]);
    }

    public function editBlog(Request $request, $id)
    {
        if (!Auth::check()) {
            return response()->json(
                [
                    "message" => "Unauthorized. Please log in first.",
                ],
                401
            );
        }

        $request->validate([
            "title" => "required",
            "content" => "required",
        ]);

        $blog = Blog::findOrFail($id);

        $blog->slug = null;
        $blog->title = $request->title;
        $blog->content = $request->content;
        $blog->save();

        return redirect("/admin/blog")->with(
            "success",
            "Blog berhasil diperbarui"
        );
    }

    public function getBlogHome()
    {
        $blogs = Blog::take(9)->get();
        return Inertia::render("Home", ["blogs" => $blogs]);
    }

    public function getAllBlog()
    {
        $blogs = Blog::all();
        return Inertia::render("Blog", ["blogs" => $blogs]);
    }

    public function getAPost($slug)
    {
        $blog = Blog::where("slug", $slug)->firstOrFail();
        $recommededBlogs = Blog::where("slug", "!=", $slug)
            ->inRandomOrder()
            ->take(3)
            ->get();

        return Inertia::render("BlogPost", ["blog" => $blog, "recommededBlogs" => $recommededBlogs]);
    }
}
