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

    public function tourDetailsScreen($id)
    {
    $tour = Tour::with('tourPackages')->findOrFail($id);

    return Inertia::render('Admin/Tour/TourDetail', [
        'id' => $tour->id,
        'title' => $tour->title,
        'description' => $tour->description,
        'tour_packages' => $tour->tourPackages
    ]);
    }

    public function addPackage(Request $request){
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthorized. Please log in first."
            ], 401);
        }
        
        $request->validate([
            'title'=>"required",
            'description'=>"required",
            'price'=>"required",
            'id'=>"required"
        ]);

        dd($request->id);

        $package = TourPackage::create([
                "title"=> $request->title,
                "description"=> $request->description,
                "price"=> $request->price,
                "tour_id"=>5
            ]);

        return redirect('/admin/tour/'.$request->id)->with('succes', 'Paket baru telah ditambahkan');
    }


}