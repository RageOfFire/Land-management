<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
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
            'transaction_date' => $faker->dateTime($max = 'now', $timezone = "GMT+7"),
            'value' => $faker->randomFloat(4, 0, 999999),
            'owner_id' => $faker->randomElement($owner)
        ];
    }
}
