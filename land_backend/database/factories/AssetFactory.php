<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('vi_VN');
        $land = \App\Models\Land::pluck('land_id')->toArray();
        return [
            'land_id' => $faker->randomElement($land),
            'home' => $faker->address(),
            'construction' => $faker->city(),
            'road' => $faker->streetAddress()
        ];
    }
}
