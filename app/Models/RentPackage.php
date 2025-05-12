<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentPackage extends Model
{
    protected $fillable = [
        "id",
        "tour_id",
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
