<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
    protected $table = "kendaraan";
    protected $fillable = [
        "id",
        "rent_id",
        "title",
        "description",
        "price",
        "created_at",
        "updated_at",
    ];

    public function Rent()
    {
        return $this->belongsTo(Rent::class, "rents");
    }
}
