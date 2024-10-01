<?php

use App\Http\Controllers\UserCompanyLinkController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function(){
    Route::get("/healthcheck",function(){
        return response()->json(["message" => "Hello from pitchbox ~ ishaan"]);
    });
    Route::prefix("user")->group(function(){
        Route::post("/register",[UserController::class,"register"]);
        Route::post("/login",[UserController::class,"login"]);
   });

    Route::middleware(["auth:sanctum"])->group(function(){
        Route::prefix("get")->group(function(){
            Route::get("company-links",[UserCompanyLinkController::class,"getCompanyLinks"]);
        });
        Route::prefix("create")->group(function(){
            Route::post("company-link",[UserCompanyLinkController::class,"createCompanyLink"]);
        });
        Route::prefix("update")->group(function(){
            Route::put("company-link/{id}",[UserCompanyLinkController::class,"updateCompanyLink"]);
        });
        Route::prefix("delete")->group(function(){
            Route::put("company-link/{id}",[UserCompanyLinkController::class,"deleteCompanyLink"]);

        });
    });
});