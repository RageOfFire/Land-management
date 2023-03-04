<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
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
            'status_charge' => $faker->dateTime($max = 'now', $timezone = "GMT+7"),
            'old_status' => $faker->realText($maxNbChars = 100, $indexSize = 2),
            'new_status' => $faker->realText($maxNbChars = 100, $indexSize = 2)
        ];
    }
}
