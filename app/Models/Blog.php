<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model {
    use Sluggable;
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'content',
        'image',
        'created_at',
        'updated_at',
        'user_id',
        'slug'
    ];

    public function sluggable(): array {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function shouldSlugOnUpdate(): bool {
        return true;
    }
}
