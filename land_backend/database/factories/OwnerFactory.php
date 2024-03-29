<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Owner>
 */
class OwnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('vi_VN');
        return [
            'name' => $faker->name(),
            'address' => $faker->address(),
            'phone_number' => $faker->numerify('#########'),
            'email' => $faker->unique()->freeEmail()
        ];
    }
}
