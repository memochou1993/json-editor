<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->route()->getName()) {
            case 'records.store':
                return [
                    'name' => [
                        'required',
                    ],
                    'data' => [
                        'required',
                        'array',
                    ],
                    'expires_in' => [
                        'integer'
                    ],
                ];

            case 'records.update':
                return [
                    'data' => [
                        'array',
                    ],
                ];

            default:
                return [];
        }
    }
}
