<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\PortofolioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Models\Portofolio;

Route::get("/", [BlogController::class, "getBlogHome"]);
Route::get("tour-package", [TourController::class, "guestToursScreen"]);
Route::get("rental", [RentController::class, "guestRentsScreen"]);
Route::get("about", function () {
    return Inertia::render("About");
});
Route::get("portfolio", [PortofolioController::class, "guestPortofolioScreen"]);

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
        Route::prefix("blog")->group(function () {
            Route::get("/", [BlogController::class, "index"]);
            Route::get("/create", [BlogController::class, "createBlogScreen"]);
            Route::get("/edit/{id}", [BlogController::class, "editBlogScreen"]);
            Route::post("/create", [BlogController::class, "createBlog"]);
            Route::put("/edit/{id}", [BlogController::class, "editBlog"]);
            Route::delete("/delete/{id}", [
                BlogController::class,
                "deleteBlog",
            ])->name("admin.blog.delete");
        });


        // module: tour
        Route::prefix("tour")->group(function () {
            Route::get("/", [TourController::class, "tourListScreen"]);
            Route::get("/{id}", [TourController::class, "tourDetailsScreen"]);
            Route::post("/create", [TourController::class, "createTour"]);
            Route::post("/package", [TourController::class, "addPackage"]);
            Route::put("/edit/{id}", [TourController::class, "editTour"]);
            Route::put("/package/{id}", [TourController::class, "editPackage"]);

            Route::delete("/delete/{id}", [
                TourController::class,
                "deleteTour",
            ]);
            Route::delete("/package/{id}", [TourController::class, "deleteTourPackage"]);
        });
        Route::delete("/admin/tour-package/delete/{id}", [
            TourController::class,
            "deleteTourPackage",
        ]);

        // module: rent
        Route::prefix("rent")->group(function () {
            Route::get("/", [RentController::class, "rentListScreen"]);
            Route::get("/{id}", [RentController::class, "rentDetailsScreen"]);
            Route::post("/create", [RentController::class, "createRent"]);
            Route::post("/add-package", [RentController::class, "addPackage"]);
            Route::put("/edit/{id}", [RentController::class, "editRent"]);
            Route::put("/package/{id}", [RentController::class, "editRentPackage"]);
            Route::delete("/delete/{id}", [RentController::class, "deleteRent",]);
            Route::delete("/package/{id}", [RentController::class, "deleteRentPackage"]);
        });


        // module: portofolio
        Route::prefix("portofolio")->group(function () {
            Route::get("/", [PortofolioController::class, "portofolioListScreen"]);
            Route::get("/create", [PortofolioController::class, "portofolioCreateScreen"]);
            Route::get("/edit/{id}", [PortofolioController::class, "portofolioEditScreen"]);
            Route::post("/create", [PortofolioController::class, "portofolioCreate"]);
            Route::put("/{id}", [PortofolioController::class, "portofolioEdit"]);
            Route::delete("/{id}", [PortofolioController::class, "portofolioDelete"]);
        });
    });
});
