<?php

use App\Record;
use Illuminate\Database\Seeder;

class RecordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $records = factory(Record::class)->times(100)->make()->toArray();

        Record::insert($records);
    }
}
