<?php

use App\Http\Controllers\BlogController;
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

Route::get('/admin/dashboard', function(){
    return Inertia::render('Admin/Dashboard');
})->middleware('auth');

Route::get('/admin/tour', function(){
    return Inertia::render('Admin/Tour/Tours');
})->middleware('auth');

Route::get('/admin/blog', [BlogController::class, "index"])->middleware('auth');

Route::get('/admin/blog/create',[BlogController::class, "createBlogScreen"])->middleware('auth');

Route::post('/admin/blog/create', [BlogController::class, "createBlog"])->middleware('auth');

Route::delete('/admin/blog/delete/{id}',[BlogController::class, "deleteBlog"])->middleware('auth') ;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';