<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $fillable=[
        'id',
        'title',
        'description',
        'created_at'
    ];

    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }
}