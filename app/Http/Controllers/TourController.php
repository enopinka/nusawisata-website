<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Tour;
use App\Models\TourPackage;


class TourController extends Controller
{
    public function index(){
        $tours = Tour::with('tourPackages')->get();

        return Inertia::render('Admin/Tour/Tours', ['tours'=>$tours]);
    }

    public function createTour(Request $request){
        // Cek apakah user sudah login
    if (!Auth::check()) {
        return response()->json([
            "message" => "Unauthorized. Please log in first."
        ], 401);
    }

    $request->validate([
        "title"=>"required",
        "description"=>"required"
    ]);

    $tour = Tour::create([
        "title"=>$request->title,
        "description"=>$request->description,
    ]);

    return redirect('/admin/tour')->with('success', 'Tour baru telah dibuat');

    }

}