<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'address', 'phone_number', 'email'
    ];
    protected $primaryKey = 'owner_id';
}
