<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Tour;
use App\Models\TourPackage;


class TourController extends Controller
{
    public function tourListScreen(){
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

     

        $package = TourPackage::create([
                "title"=> $request->title,
                "description"=> $request->description,
                "price"=> $request->price,
                "tour_id"=>$request->id
            ]);

        return redirect('/admin/tour/'.$request->id)->with('succes', 'Paket baru telah ditambahkan');
    }

    public function editTour(Request $request, $id){
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthorized. Please log in first."
            ], 401);
        }

        $request->validate([
            "title" => "required",
            "description" => "required",
        ]);

        $tour = Tour::findOrFail($id);
        
        $tour->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);
        return redirect('/admin/tour')->with('success', 'Tour telah diedit');
    
    }

    public function deleteTour($id){
        $tour = Tour::findOrFail($id);
        $tour_packages = TourPackage::where('tour_id', $id)->delete();
        $tour->delete();
       
        return redirect("admin/tour")->with("Success", "Tour berhasil dihapus");

    }

    public function deleteTourPackage($id){
        $tour_package = TourPackage::findOrFail($id);
        $tour_id = $tour_package->tour_id;
        $tour_package->delete();
        
        return redirect('admin/tour/'.$tour_id)->with("Success", "Berhasil menghapus paket wisata");
    }

    public function guestToursScreen(){
        $tours = Tour::with('tourPackages')->get()->map(function ($tour) {
            return [
                'id' => $tour->id,
                'title' => $tour->title,
                'description' => $tour->description,
                'tourPackages' => $tour->tourPackages->map(function ($pkg) {
                    return [
                        'title' => $pkg->title,
                        'description' => $pkg->description,
                        'price' => $pkg->price,
                    ];
                }),
            ];
        });
    
        return Inertia::render('TourPackage', [
            'tours' => $tours,
        ]);
    }
}