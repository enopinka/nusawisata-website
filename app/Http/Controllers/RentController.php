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

        // dd($rent->rentPackages);
        return Inertia::render('Admin/Rent/RentDetail', [
            'id_jenis_kendaraan' => $rent->id_jenis_kendaraan,
            'title' => $rent->title,
            'description' => $rent->description,
            'rent_packages' => $rent->rentPackages,
        ]);
    }

    public function addPackage(Request $request)
    {

        $request->validate([
            'title' => "required",
            'description' => "required",
            'price' => "required",
            'id_jenis_kendaraan' => "required",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg"
        ]);
        $imagePath = $request->file('image')->store('kendaraan', 'public');

        $package = Kendaraan::create([
            "title" => $request->title,
            "description" => $request->description,
            "price" => $request->price,
            "id_jenis_kendaraan" => $request->id_jenis_kendaraan,
            "image" => $imagePath
        ]);

        return redirect('admin/rent/' . $request->id_jenis_kendaraan)->with('Success', 'Paket baru telah ditambahkan');
    }

    public function deleteRentPackage($id)
    {

        $kendaraan = Kendaraan::findOrFail($id);
        $id_jenis_kendaraan = $kendaraan->id_jenis_kendaraan;
        // dd($id_jenis_kendaraan);
        $kendaraan->delete();

        return redirect('admin/rent/' . $id_jenis_kendaraan)->with("Success", "Berhasil menghapus");
    }
}
