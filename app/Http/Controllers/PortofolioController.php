<?php

namespace App\Http\Controllers;

use App\Models\Portofolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortofolioController extends Controller
{
    public function portofolioListScreen()
    {
        $portofolios = Portofolio::all();
        return Inertia::render("Admin/Portofolio/Portofolio", ['portofolios' => $portofolios]);
    }

    public function portofolioCreateScreen()
    {
        return Inertia::render("Admin/Portofolio/PortofolioEditor");
    }

    public function portofolioCreate(Request $request)
    {
        $request->validate([
            "title" => "required",
            "description" => "required",
            "picture" => "required|image|mimes:jpeg,png,jpg,gif,svg"
        ]);

        $picturePath = $request->file('picture')->store('portofolio', 'public');

        Portofolio::create([
            "title" => $request->title,
            "description" => $request->description,
            "image" => $picturePath
        ]);

        return redirect('/admin/portofolio')->with('success', 'Portofolio baru telah dibuat');
    }
}
