<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $table = "kendaraan";
    protected $primaryKey = 'id_kendaraan';

    protected $fillable = [
        "id",
        "id_jenis_kendaraan",
        "title",
        "description",
        "price",
        "created_at",
        "updated_at",
        "image",
    ];

    public function Rent()
    {
        return $this->belongsTo(JenisKendaraan::class, "id_jenis_kendaraan", "id");
    }
}
