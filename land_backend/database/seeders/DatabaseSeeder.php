<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(1)->create();
        \App\Models\Owner::factory(10)->create();
        \App\Models\Land::factory(10)->create();
        \App\Models\Transaction::factory(10)->create();
        \App\Models\Status::factory(10)->create();
        \App\Models\Asset::factory(10)->create();
        \App\Models\Contract::factory(10)->create();
        \App\Models\Cost::factory(10)->create();
        \App\Models\Modstatus::factory(10)->create();
    }
}
