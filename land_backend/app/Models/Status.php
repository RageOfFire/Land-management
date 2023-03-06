<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
        'land_id', 'status_charge', 'old_status', 'new_status'
    ];
    protected $primaryKey = 'status_id';

    protected $casts = [
        'status_charge' => 'datetime:Y-m-d',
    ];
}
