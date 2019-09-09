<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Resources\Json\JsonResource;

class RecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'hash_id' => $this->hash_id,
            'name' => $this->name,
            'data' => Crypt::decrypt($this->data),
            'expires_in' => $this->expires_in,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
