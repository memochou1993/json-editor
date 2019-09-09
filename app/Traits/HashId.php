<?php

namespace App\Traits;

use Hashids\Hashids;

trait HashId
{
    /**
     * @return string
     */
    public function encode($value)
    {
        return (new Hashids('', 10))->encode($value);
    }

    /**
     * @return array
     */
    public function decode($value)
    {
        return (new Hashids('', 10))->decode($value);
    }

    /**
     * Get the hash id for the model.
     *
     * @return string
     */
    public function getHashIdAttribute()
    {
        return $this->encode($this->attributes['id']);
    }
}
