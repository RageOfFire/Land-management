<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Land extends Model
{
    use HasFactory;
    protected $fillable = [
        'address', 'area_decimal', 'use_plans', 'status', 'value', 'owner_id'
    ];
    protected $primaryKey = 'land_id';
}
