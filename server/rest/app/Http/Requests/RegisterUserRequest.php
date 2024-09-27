<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
        "name" => "string|required",
        "email" => "string|required",
        "username" => "string|required",
        "password" => "string|required",
        "github_url" => "string|required",
        "linkedin_url" => "string|required"
        ];
    }
}
