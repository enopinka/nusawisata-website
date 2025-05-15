<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisLayanan extends Model
{
    protected $table = "jenis_layanan";
    protected $fillable = [
        "id",
        "tour_id",
        "title",
        "description",
        "price",
        "created_at",
        "updated_at",
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class, "tours");
    }
}
