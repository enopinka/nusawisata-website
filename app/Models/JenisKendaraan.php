<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisKendaraan extends Model
{
    protected $table = "jenis_kendaraan";
    protected $fillable = ["id", "title", "description", "created_at"];

    public function rentPackages()
    {
        return $this->hasMany(Kendaraan::class, "id_jenis_kendaraan", "id");
    }
}
