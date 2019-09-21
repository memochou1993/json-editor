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
            ->post('/records', $data);

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
            ->get('/records/'.$record->code);

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
    public function testShowUnexpired()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create([
            'expires_in' => 3600,
        ]);

        $response = $this
            ->withHeaders($headers)
            ->get('/records/'.$record->code);

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
    public function testShowExpired()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create([
            'expires_in' => -1,
        ]);

        $response = $this
            ->withHeaders($headers)
            ->get('/records/'.$record->code);

        // dd($response->getContent());

        $response
            ->assertStatus(404);
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
            ->put('/records/'.$record->code, $data);

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
            ->delete('/records/'.$record->code);

        // dd($response->getContent());

        $response
            ->assertStatus(204);
    }

    /**
     * @return void
     */
    public function testDestroyChecked()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create([
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);

        $data = [
            'password' => 'password',
        ];

        $response = $this
            ->withHeaders($headers)
            ->delete('/records/'.$record->code, $data);

        // dd($response->getContent());

        $response
            ->assertStatus(204);
    }

    /**
     * @return void
     */
    public function testDestroyUnchecked()
    {
        $headers = [
            'Accept' => 'application/json',
        ];

        $record = factory(Record::class)->create([
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ]);

        $response = $this
            ->withHeaders($headers)
            ->delete('/records/'.$record->code);

        // dd($response->getContent());

        $response
            ->assertStatus(403);
    }
}
