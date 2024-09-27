<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function(){
    Route::get("/healthcheck",function(){
        return response()->json(["message" => "Hello from pitchbox ~ ishaan"]);
    });
    Route::prefix("user")->group(function(){
        Route::post("/register",[UserController::class,"register"]);
    });

    
    Route::prefix("get")->group(function(){});
    Route::prefix("create")->group(function(){});
    Route::prefix("update")->group(function(){});
    Route::prefix("delete")->group(function(){});


    Route::middleware(["auth:sanctum"])->group(function(){
        Route::prefix("get")->group(function(){});
        Route::prefix("create")->group(function(){});
        Route::prefix("update")->group(function(){});
        Route::prefix("delete")->group(function(){});
    });
});