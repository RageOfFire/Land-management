<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cost>
 */
class CostFactory extends Factory
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
            'service_cost' => $faker->randomFloat(4, 0, 999999),
            'maintenance_cost' => $faker->randomFloat(4, 0, 999999),
            'manage_cost' => $faker->randomFloat(4, 0, 999999)
        ];
    }
}
