<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Blog;

class BlogController extends Controller
{
    public function index(){
        $blogs = Blog::all();
        return Inertia::render("Admin/Blog/Blogs", ['blogs'=>$blogs]);
    }
    
    public function createBlogScreen(){
        return Inertia::render("Admin/Blog/Create");
    }

    

    public function createBlog(Request $request){
// Cek apakah user sudah login
if (!Auth::check()) {
    return response()->json([
        "message" => "Unauthorized. Please log in first."
    ], 401);
}

        $request->validate([
            "title" =>"required",
            "content" =>"required",
            
        ]);

        $blog= Blog::create([
            "user_id"=> 1,
            "title" => $request->title,
            "content"=> $request->content,
        ]);

        return response()->json([
            "message" => "Blog created successfully",
            "blog" => $blog
        ], 201);
    }
}