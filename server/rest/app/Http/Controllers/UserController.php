<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(protected UserService $service)
    {
    }
    
    public function register(RegisterUserRequest $request){
        $validated = $request->validated();
        $user = $this->service->register(
            $validated["email"],
            $validated["name"],
            $validated["username"],
            $validated["password"],
            $validated["github_url"],
            $validated["linkedin_url"]
        );
        $test = $this->service->seedCompanyLinks($user->id);
         return response()->json(["message" => "registered successfully!", "test" => $test],201);        
    }
}
