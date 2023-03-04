<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cost extends Model
{
    use HasFactory;
    protected $fillable = [
        'land_id', 'service_cost', 'maintenance_cost', 'manage_cost'
    ];
    protected $primaryKey = 'cost_id';
}
