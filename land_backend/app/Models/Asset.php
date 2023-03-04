<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;
    protected $fillable = [
        'land_id', 'home', 'construction', 'road'
    ];
    protected $primaryKey = 'asset_id';
}
