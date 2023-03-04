<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modstatus extends Model
{
    use HasFactory;
    protected $fillable = [
        'land_id', 'mod_date', 'mod_info', 'mod_name', 'mod_reason'
    ];
    protected $primaryKey = 'mod_id';
}
