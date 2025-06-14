<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisLayanan extends Model
{
    protected $table = "jenis_layanan";
    protected $primaryKey = "id_jenis_layanan";
    protected $fillable = [
        "id",
        "id_destinasi",
        "title",
        "description",
        "price",
        "image",
        "created_at",
        "updated_at",
    ];

    public function tour()
    {
        return $this->belongsTo(Destinasi::class, "id_destinasi", "id_destinasi");
    }
}
