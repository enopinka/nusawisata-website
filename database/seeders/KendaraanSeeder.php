<?php

namespace Database\Seeders;

use App\Models\Kendaraan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KendaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                "title" => "Pajero",
                "description" => "Ini adalah deskripsi untuk paket A",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Fortuner",
                "description" => "Ini adalah deskripsi untuk paket B",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Land Cruiser",
                "description" => "Ini adalah deskripsi untuk paket C",
                "price" => 1234,
                "image" => "",
            ],
            [
                "title" => "Picanto",
                "description" => "Ini adalah deskripsi untuk paket D",
                "price" => 1234,
                "image" => "",
            ],
        ];

        for (
            $idJenisKendaraan = 1;
            $idJenisKendaraan <= 3;
            $idJenisKendaraan++
        ) {
            foreach ($items as $item) {
                Kendaraan::insert([
                    "id_jenis_kendaraan" => $idJenisKendaraan,
                    "title" => $item["title"],
                    "description" => $item["description"],
                    "price" => $item["price"],
                    "image" => $item["image"],
                ]);
            }
        }
    }
}
