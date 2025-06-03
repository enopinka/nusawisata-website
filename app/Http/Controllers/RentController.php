<?php

namespace App\Http\Controllers;

use App\Models\JenisKendaraan;
use App\Models\Kendaraan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RentController extends Controller
{
    public function guestRentsScreen()
    {

        $jenisKendaraan = JenisKendaraan::with('rentPackages')->get();

        return Inertia::render("Rental", ['jenisKendaraan' => $jenisKendaraan]);
    }
    public function rentListScreen()
    {
        $rents = JenisKendaraan::with('rentPackages')->get();

        return Inertia::render("Admin/Rent/Rents", ['rents' => $rents]);
    }

    public function createRent(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthorized. Please log in first."
            ], 401);
        }

        $request->validate([
            "title" => "required",
            "description" => "required"
        ]);
        $rent = JenisKendaraan::create([
            "title" => $request->title,
            "description" => $request->description,
        ]);

        return redirect('/admin/rent')->with('success', 'Rent baru telah dibuat');
    }

    public function editRent(Request $request, $id)
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

        $rent = JenisKendaraan::findOrFail($id);
        $rent->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return redirect('/admin/rent')->with('success', 'Rental telah diedit');
    }

    public function deleteRent($id)
    {
        $rent = JenisKendaraan::findOrFail($id);
        $rent_packages = Kendaraan::where('rent_id', $id)->delete();
        $rent->delete();

        return redirect("admin/rent")->with("Success", "Rent berhasil dihapus");
    }

    public function rentDetailsScreen($id)
    {
        $rent = JenisKendaraan::with('rentPackages')->findOrFail($id);

        // dd($rent->rent_packages);
        return Inertia::render('Admin/Rent/RentDetail', [
            'id' => $rent->id,
            'title' => $rent->title,
            'description' => $rent->description,
            'rent_packages' => $rent->rentPackages,
        ]);
    }

    public function addPackage(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                "message" => "Unauthorized. Please log in first."
            ], 401);
        }

        $request->validate([
            'title' => "required",
            'description' => "required",
            'price' => "required",
            'id' => "required"
        ]);
        // dd($request->id);

        $package = Kendaraan::create([
            "title" => $request->title,
            "description" => $request->description,
            "price" => $request->price,
            "rent_id" => $request->id
        ]);

        return redirect('admin/rent/' . $request->id)->with('Success', 'Paket baru telah ditambahkan');
    }

    public function deleteRentPackage($id)
    {

        $rent_package = Kendaraan::findOrFail($id);
        $rent_id = $rent_package->rent_id;
        $rent_package->delete();

        return redirect('admin/rent/' . $rent_id)->with("Success", "Berhasil menghapus");
    }
}
