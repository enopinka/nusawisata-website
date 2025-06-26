<?php

namespace Database\Seeders;

use App\Models\JenisLayanan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JenisLayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                "title" => "Paket A",
                "description" => "Ini adalah deskripsi untuk paket A",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Paket B",
                "description" => "Ini adalah deskripsi untuk paket B",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Paket C",
                "description" => "Ini adalah deskripsi untuk paket C",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Paket D",
                "description" => "Ini adalah deskripsi untuk paket D",
                "price" => 1234,
                "image" => "",
            ],
        ];

        for ($idDestinasi = 1; $idDestinasi <= 4; $idDestinasi++) {
            foreach ($items as $item) {
                JenisLayanan::insert([
                    "id_destinasi" => $idDestinasi,
                    "title" => $item["title"],
                    "description" => $item["description"],
                    "price" => $item["price"],
                    "image" => $item["image"],
                ]);
            }
        }
    }
}
