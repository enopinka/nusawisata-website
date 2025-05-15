<?php

namespace Database\Seeders;

use App\Models\JenisKendaraan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JenisKendaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                "title" => "Besar",
                "description" => "Ini deskripsi untuk jenis kendaraan besar",
            ],
            [
                "title" => "Sedang",
                "description" => "Ini deskripsi untuk jenis kendaraan sedang",
            ],
            [
                "title" => "Kecil",
                "description" => "Ini deskripsi untuk jenis kendaraan kecil",
            ],
        ];
        JenisKendaraan::insert($items);
    }
}
