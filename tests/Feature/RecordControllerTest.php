<?php

namespace Tests\Feature;

use App\Record;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RecordControllerTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    /**
     * @return void
     */
    public function testStore()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $data = [
            'name' => $this->faker->word(),
            'data' => [
                'city' => $this->faker->city(),
            ],
        ];

        $response = $this
            ->withHeaders($headers)
            ->post('/api/records', $data);

        // dd($response->getContent());

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'name',
                'data',
                'expires_in',
                'created_at',
                'updated_at',
            ]);
    }

    /**
     * @return void
     */
    public function testShow()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create();

        $response = $this
            ->withHeaders($headers)
            ->get('/api/records/'.$record->id);

        // dd($response->getContent());

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'name',
                'data',
                'expires_in',
                'created_at',
                'updated_at',
            ]);
    }

    /**
     * @return void
     */
    public function testUpdate()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create();

        $data = [
            'name' => $this->faker->word(),
            'data' => [
                'city' => $this->faker->city(),
            ],
        ];

        $response = $this
            ->withHeaders($headers)
            ->put('/api/records/'.$record->id, $data);

        // dd($response->getContent());

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'name',
                'data',
                'expires_in',
                'created_at',
                'updated_at',
            ]);
    }

    /**
     * @return void
     */
    public function testDestroy()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create();

        $response = $this
            ->withHeaders($headers)
            ->delete('/api/records/'.$record->id);

        // dd($response->getContent());

        $response
            ->assertStatus(204);
    }
}
