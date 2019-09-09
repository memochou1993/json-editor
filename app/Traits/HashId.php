<?php

namespace App\Traits;

use Vinkla\Hashids\Facades\Hashids;

trait HashId
{
    /**
     * @return string
     */
    public function getHashIdAttribute()
    {
        return Hashids::encode($this->attributes['id']);
    }
}
