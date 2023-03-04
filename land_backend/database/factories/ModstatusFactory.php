<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modstatus>
 */
class ModstatusFactory extends Factory
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
            'mod_date' => $faker->dateTime($max = 'now', $timezone = "GMT+7"),
            'mod_info' => $faker->realText($maxNbChars = 100, $indexSize = 2),
            'mod_name' => $faker->realText($maxNbChars = 20, $indexSize = 1),
            'mod_reason' => $faker->realText($maxNbChars = 100, $indexSize = 2)
        ];
    }
}
