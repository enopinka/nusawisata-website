<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portofolio extends Model
{
    protected $table = "portofolio";
    protected $primaryKey = 'id_portofolio';
    protected $fillable = [
        'id_portofolio',
        'title',
        'description',
        'image',
        'created_at',
        'updated_at',
    ];
}
