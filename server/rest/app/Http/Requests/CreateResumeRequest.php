<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateResumeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "title" => "required|string",
            'resume' => 'required|file|mimes:pdf,doc,docx|max:4096',
        ];
    }
}
