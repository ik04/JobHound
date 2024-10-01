<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCompanyLinkRequest extends FormRequest
{
    public function rules(): array
    {
        return [
        "title" => "required|string",
        "link" => "required|string"
        ];
    }
}
