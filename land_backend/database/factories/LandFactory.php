<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Land>
 */
class LandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('vi_VN');
        $owner = \App\Models\Owner::pluck('owner_id')->toArray();
        return [
            'address' => $faker->streetAddress(),
            'area_decimal' => $faker->randomFloat(4, 0, 99),
            'use_plans' => $faker->realText($maxNbChars = 100, $indexSize = 2),
            'status' => $faker->boolean($chanceOfGettingTrue = 50),
            'value' => $faker->randomFloat(4, 0, 999999),
            'owner_id' => $faker->randomElement($owner)
        ];
    }
}
