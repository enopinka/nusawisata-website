<?php

namespace Database\Seeders;

use App\Models\Destinasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                "title" => "Jakarta",
                "description" => "Destinasi wisata ke Jakarta",
                "image" => "",
            ],
            [
                "title" => "Jakarta",
                "description" => "Destinasi wisata ke Jakarta",
                "image" => "",
            ],
            [
                "title" => "Jakarta",
                "description" => "Destinasi wisata ke Jakarta",
                "image" => "",
            ],
            [
                "title" => "Jakarta",
                "description" => "Destinasi wisata ke Jakarta",
                "image" => "",
            ],
        ];
        Destinasi::insert($items);
    }
}
