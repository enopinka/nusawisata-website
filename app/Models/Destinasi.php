<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinasi extends Model
{
    protected $table = "destinasi";
    protected $primaryKey = "id_destinasi";
    protected $fillable = ["id", "title", "description", "image", "created_at"];

    public function tourPackages()
    {
        return $this->hasMany(JenisLayanan::class, "id_destinasi", "id_destinasi");
    }
}
