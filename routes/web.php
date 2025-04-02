<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\TourController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;

Route::get('/', [BlogController::class, "getBlogHome"]);

Route::get('tour-package', function(){
    return Inertia::render('TourPackage');
});

Route::get('rental', function(){
    return Inertia::render('Rental');
});

Route::get('about', function(){
    return Inertia::render('About');
});

Route::get('blog', 
[BlogController::class, "getAllBlog"]);

Route::get('blog/{slug}', 
[BlogController::class, "getAPost"]);

Route::get('portfolio', function(){
    return Inertia::render('Portfolio');
});

Route::get('/admin/login', [LoginController::class, "index"]
)->name("login");

Route::post('/admin/login',[LoginController::class, "authenticate"] );

Route::post('/admin/logout',[LoginController::class, "unauthenticate"] );


// butuh akses admin
Route::middleware('auth')->group(function(){
    Route::get('/admin/dashboard', function(){
        return Inertia::render('Admin/Dashboard');
    });
    Route::get('/admin/blog', [BlogController::class, "index"]);
    Route::get('/admin/blog/create',[BlogController::class, "createBlogScreen"]);
    Route::get( '/admin/tour', [TourController::class, "index"]);
    
    Route::post('/admin/blog/create', [BlogController::class, "createBlog"]);
    Route::post('/admin/tour/create', [TourController::class, "createTour"]);

    Route::delete('/admin/blog/delete/{id}',[BlogController::class, "deleteBlog"]);
});