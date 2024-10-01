<?php

namespace App\Http\Controllers;

use App\Exceptions\IncorrectPasswordException;
use App\Exceptions\UserNotFoundException;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\UserService;
use Exception;
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
        $this->service->seedCompanyLinks($user->id);
         return response()->json(["message" => "registered successfully!"],201);        
    }
    public function login(LoginUserRequest $request){
        try{
            $validated = $request->validated();
            $user = $this->service->login($validated["login"],$validated["password"]);
            $userToken = $user->createToken("myusertoken")->plainTextToken;
             return response()->json(["user"=>$user,"user_token"=>$userToken],200)->withCookie(cookie()->forever('token',$userToken));
        }catch(UserNotFoundException $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }catch(IncorrectPasswordException $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }catch(Exception $e){
            return response()->json(["message"=>$e->getMessage()],$e->getCode());
        }
    }
    
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }
}
