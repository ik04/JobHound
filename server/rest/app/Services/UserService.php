<?php

namespace App\Services;

use App\Enums\Role;
use App\Exceptions\AlreadyDemotedException;
use App\Exceptions\AlreadyPromotedException;
use App\Exceptions\IncorrectPasswordException;
use App\Exceptions\UserNotFoundException;
use App\Models\Resume;
use App\Models\User;
use App\Models\UserCompanyLink;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
        unset($user["password"]);
        return $user;
    }

    public function login(string $login, string $password){
        $user = User::where("email",$login)->orWhere("username",$login)->first();
        if(!$user){
            throw new UserNotFoundException(message:"User is not registered",code:400);
        }
        if(!Hash::check($password,$user->password)){
            throw new IncorrectPasswordException(message:"Incorrect Password",code:400);
        }
        unset($user["password"]);
        return $user;
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }

    public function deleteUser(int $userId){
        $user = User::where('id', $userId)->first();
    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }
    $user->delete();
    }

    public function deleteOwnAccount(Request $request,$userId){
        if ($userId !== $request->user()->id) {
            return response()->json(["error" => "Unauthorized"], 401);
        }
        $request->user()->delete();
    }

    public function seedCompanyLinks($userId){
        $path = database_path("seeders/data/links.json");
        if (!File::exists($path)) {
            throw new \Exception("File not found at path: $path");
        }
        $jsonData = File::get($path);
        $data = json_decode($jsonData, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("Error decoding JSON: " . json_last_error_msg());
        }
        if (!isset($data['links'])) {
            throw new \Exception("'links' key not found in JSON data.");
        }
        foreach ($data['links'] as $link) {
            UserCompanyLink::create([
                "title" => $link['title'],  
                "link" => $link['link'],    
                "user_id" => $userId
            ]);
        }
    }

    public function deleteUserAndFiles(int $userId) {
        $user = User::find($userId);
        if (!$user) {
            throw new UserNotFoundException("User not found!");
        }
        $resumes = Resume::where('user_id', $userId)->get();
        foreach ($resumes as $resume) {
            $file = str_replace('/storage/', '', $resume->file_url); 
    
            if (Storage::disk('public')->exists($file)) {
                Storage::disk('public')->delete($file);
            }
        }
        $user->delete();
    }
    
    



}