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

    public function portofolioDelete($id)
    {
        $portofolio = Portofolio::findOrFail($id);
        $portofolio->delete();

        return redirect('admin/portofolio')->with('success', 'Portofolio telah dihapus');
    }

    public function portofolioEditScreen($id)
    {
        $portofolio = Portofolio::findOrFail($id);
        return Inertia::render("Admin/Portofolio/PortofolioEditor", ['portofolio' => $portofolio]);
    }

    public function portofolioEdit(Request $request, $id)
    {
        $request->validate([
            "title" => "required",
            "description" => "required",
            "picture" => "nullable|image|mimes:jpeg,png,jpg,gif,svg"
        ]);

        $portofolio = Portofolio::findOrFail($id);

        $data = [
            "title" => $request->title,
            "description" => $request->description,
        ];

        if ($request->hasFile('picture')) {
            $picturePath = $request->file('picture')->store('portofolio', 'public');
            $data['image'] = $picturePath;
        }

        $portofolio->update($data);

        return redirect('/admin/portofolio')->with('success', 'Portofolio telah diperbarui');
    }
}
