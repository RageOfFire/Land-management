<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $fillable = [
        'land_id', 'contract_start', 'contract_end', 'use_plans', 'value'
    ];
    protected $primaryKey = 'contract_id';

    protected $casts = [
        'contract_start' => 'datetime:Y-m-d',
        'contract_end' => 'datetime:Y-m-d',
    ];
}
