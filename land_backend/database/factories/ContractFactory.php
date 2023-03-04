<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
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
            'contract_start' => $faker->dateTime($max = 'now', $timezone = "GMT+7"),
            'contract_end' => $faker->dateTimeBetween($startDate = '+1 years', $endDate = '+10 years', $timezone = "GMT+7"),
            'use_plans' => $faker->realText($maxNbChars = 100, $indexSize = 2),
            'value' => $faker->randomFloat(4, 0, 999999),
        ];
    }
}
