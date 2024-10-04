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

    public function getUserData(Request $request){
            if(!$request->hasCookie("token")){
                return response()->json([
                    'error' => "Unauthenticated"
                ],401);
            }
            if($token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->cookie("token"))){
                $user = $token->tokenable;
            }
            else{
                return response()->json([
                    'error' => "unauthenticated"
                ],401);
            }
            if(is_null($user)){
                return response()->json([
                    'error' => "Unauthenticated"
                ],401);
            }
            return response() -> json([
                'email' => $user->email,
                'name' => $user->name,
                'username' => $user->username,
                'github_url' => $user->github_url,
                'linkedin_url' => $user->linkedin_url,
                'token' => $request -> cookie('token'),
            ],200);
        }
    
    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }
}
