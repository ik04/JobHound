<?php

use App\Models\User;

it('can register users', function () {
    $data = [
        "name" => "ishaan khurana",
        "username" => "osiris",
        "email" => "1@1.com",
        "password" => "1",
        "github_url" => "https://github.com/ik04",
        "linkedin_url" => "https://www.linkedin.com/in/ishaan-khurana-398114212/"
    ];
    $response = $this->post('/v1/user/register', $data);
    $response->assertStatus(201);
    User::where("email","1@1.com")->delete();
});
