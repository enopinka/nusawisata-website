<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\TourController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;

Route::get("/", [BlogController::class, "getBlogHome"]);
Route::get("tour-package", [TourController::class, "guestToursScreen"]);
Route::get("rental", function () {
    return Inertia::render("Rental");
});
Route::get("about", function () {
    return Inertia::render("About");
});
Route::get("portfolio", function () {
    return Inertia::render("Portfolio");
});

// public
// module: blog
Route::prefix("blog")->group(function () {
    Route::get("/", [BlogController::class, "getAllBlog"]);
    Route::get("/{slug}", [BlogController::class, "getAPost"]);
});

// module: auth admin
Route::prefix("admin")->group(function () {
    Route::get("/login", [LoginController::class, "index"])->name("login");
    Route::post("/login", [LoginController::class, "authenticate"])->name(
        "admin.login"
    );
    Route::post("/logout", [LoginController::class, "unauthenticate"])->name(
        "admin.logout"
    );
});

// butuh akses admin
Route::middleware("auth")->group(function () {
    // role: admin
    Route::prefix("admin")->group(function () {
        // module: dashboard
        Route::prefix("dashboard")->group(function () {
            Route::get("/", fn() => Inertia::render("Admin/Dashboard"));
        });

        // module: blog

        // module: tour

        // module: rent
    });

    Route::get("/admin/blog", [BlogController::class, "index"]);
    Route::get("/admin/blog/create", [
        BlogController::class,
        "createBlogScreen",
    ]);
    Route::get("/admin/blog/edit/{id}", [
        BlogController::class,
        "editBlogScreen",
    ]);
    Route::get("/admin/tour", [TourController::class, "tourListScreen"]);
    Route::get("/admin/tour/{id}", [
        TourController::class,
        "tourDetailsScreen",
    ]);
    Route::get("/admin/rent", [RentController::class, "rentListScreen"]);
    Route::get("/admin/rent/{id}", [
        RentController::class,
        "rentDetailsScreen",
    ]);

    Route::post("/admin/blog/create", [BlogController::class, "createBlog"]);
    Route::post("/admin/tour/create", [TourController::class, "createTour"]);
    Route::post("/admin/rent/create", [RentController::class, "createRent"]);
    Route::post("/admin/tour/add-package", [
        TourController::class,
        "addPackage",
    ]);
    Route::post("/admin/rent/add-package", [
        RentController::class,
        "addPackage",
    ]);

    Route::put("/admin/blog/edit/{id}", [BlogController::class, "editBlog"]);
    Route::put("/admin/tour/edit/{id}", [TourController::class, "editTour"]);
    Route::put("/admin/rent/edit/{id}", [RentController::class, "editRent"]);

    Route::delete("/admin/blog/delete/{id}", [
        BlogController::class,
        "deleteBlog",
    ]);
    Route::delete("/admin/tour/delete/{id}", [
        TourController::class,
        "deleteTour",
    ]);
    Route::delete("/admin/rent/delete/{id}", [
        RentController::class,
        "deleteRent",
    ]);
    Route::delete("/admin/tour-package/delete/{id}", [
        TourController::class,
        "deleteTourPackage",
    ]);
    Route::delete("/admin/rent-package/delete/{id}", [
        RentController::class,
        "deleteRentPackage",
    ]);
});
