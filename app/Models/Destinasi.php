<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinasi extends Model
{
    protected $table = "destinasi";
    protected $fillable = ["id", "title", "description", "created_at"];

    public function tourPackages()
    {
        return $this->hasMany(JenisLayanan::class);
    }
}
