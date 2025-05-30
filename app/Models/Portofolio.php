<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portofolio extends Model
{
    protected $table = "portofolio";
    protected $fillable = [
        'id',
        'title',
        'description',
        'created_at',
        'updated_at',
    ];
}
