<?php

namespace App\Services;

use App\Enums\Role;
use App\Exceptions\AlreadyDemotedException;
use App\Exceptions\AlreadyPromotedException;
use App\Exceptions\IncorrectPasswordException;
use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserService{
    // todo: make verify user and forgot passwrd
    public function getUserId($userUuid){
        $userId = User::select("id")->where("user_uuid",$userUuid)->first("id")->id;
        return $userId;
    }
    public function register(string $email,string $name, string $username, string $password, string $githubUrl, string $linkedinUrl){
        $user = User::create([
            "email" => $email,
            "username" => $username,
            "name" => $name,
            "password" => Hash::make($password),
            "linkedin_url" => $linkedinUrl,
            "github_url" => $githubUrl
        ]);
        return $user;
    }
    public function login(string $email, string $password){
        $user = User::where("email",$email)->first();
        if(!$user){
            throw new UserNotFoundException(message:"User is not registered",code:400);
        }
        if(!Hash::check($password,$user->password)){
            throw new IncorrectPasswordException(message:"Incorrect Password",code:400);
        }
        return $user;
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }


    public function deleteUser(Uuid $userId){
        $user = User::where('id', $userId)->first();

    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }

    $user->delete();

    }
    public function deleteOwnAccount(Request $request,Uuid $userUuid){
        if ($userUuid !== $request->user()->user_uuid) {
            return response()->json(["error" => "Unauthorized"], 401);
        }
        $request->user()->delete();
    }

}