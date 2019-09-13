<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Record;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Crypt;

$factory->define(Record::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'data' => Crypt::encrypt(json_encode([
            'city' => $faker->city(),
        ])),
    ];
});
