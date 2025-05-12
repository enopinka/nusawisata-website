<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Rent;
use App\Models\RentPackage;

class RentController extends Controller
{
    public function rentListScreen()
    {
        $rents = Rent::with('rentPackages')->get();

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
        $rent = Rent::create([
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

        $rent = Rent::findOrFail($id);
        $rent->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return redirect('/admin/rent')->with('success', 'Rental telah diedit');
    }

    public function deleteRent($id)
    {
        $rent = Rent::findOrFail($id);
        $rent_packages = RentPackage::where('rent_id', $id)->delete();
        $rent->delete();

        return redirect("admin/rent")->with("Success", "Rent berhasil dihapus");
    }
}
