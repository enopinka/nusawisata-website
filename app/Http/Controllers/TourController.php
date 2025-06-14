<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use App\Models\JenisLayanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class TourController extends Controller
{
    public function tourListScreen()
    {
        $tours = Destinasi::with('tourPackages')->get();


        return Inertia::render('Admin/Tour/Tours', ['tours' => $tours]);
    }

    public function createTour(Request $request)
    {
        $request->validate([
            "title" => "required",
            "description" => "required",
            "image" => "image|mimes:jpeg,png,jpg,gif,svg",
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tour', 'public');
        }

        $tour = Destinasi::create([
            "title" => $request->title,
            "description" => $request->description,
            "image" => $imagePath,
        ]);

        return redirect('/admin/tour')->with('success', 'Tour baru telah dibuat');
    }

    public function tourDetailsScreen($id)
    {
        $tour = Destinasi::with('tourPackages')->findOrFail($id);

        return Inertia::render('Admin/Tour/TourDetail', [
            'id_destinasi' => $tour->id_destinasi,
            'title' => $tour->title,
            'description' => $tour->description,
            'tour_packages' => $tour->tourPackages
        ]);
    }

    public function addPackage(Request $request)
    {

        $request->validate([
            'title' => "required",
            'description' => "required",
            'price' => "required",
            'id_destinasi' => "required",
            "image" => "image|mimes:jpeg,png,jpg,gif,svg"
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tour', 'public');
        }

        $package = JenisLayanan::create([
            "title" => $request->title,
            "description" => $request->description,
            "price" => $request->price,
            "id_destinasi" => $request->id_destinasi,
            "image" => $imagePath
        ]);

        return redirect('/admin/tour/' . $request->id_destinasi)->with('succes', 'Paket baru telah ditambahkan');
    }

    public function editTour(Request $request, $id)
    {
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthorized. Please log in first."
            ], 401);
        }

        $request->validate([
            "title" => "required",
            "description" => "required",
        ]);

        $tour = Destinasi::findOrFail($id);

        $tour->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);
        return redirect('/admin/tour')->with('success', 'Tour telah diedit');
    }

    public function deleteTour($id)
    {
        $tour = Destinasi::findOrFail($id);
        $tour_packages = JenisLayanan::where('tour_id', $id)->delete();
        $tour->delete();

        return redirect("admin/tour")->with("Success", "Tour berhasil dihapus");
    }

    public function deleteTourPackage($id)
    {
        $tour_package = JenisLayanan::findOrFail($id);
        $tour_id = $tour_package->id_destinasi;
        $tour_package->delete();


        return redirect('admin/tour/' . $tour_id)->with("Success", "Berhasil menghapus paket wisata");
    }

    public function guestToursScreen()
    {
        $tours = Destinasi::with('tourPackages')->get()->map(function ($tour) {
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
