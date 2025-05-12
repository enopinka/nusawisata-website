<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    protected $fillable = [
        'id',
        'title',
        'description',
        'created_at'
    ];

    public function rentPackages()
    {
        return $this->hasMany(RentPackage::class);
    }
}
