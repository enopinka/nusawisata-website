<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    protected $fillable=[
        "id",
        "tours",
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