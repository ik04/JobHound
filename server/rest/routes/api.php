<?php

use App\Http\Controllers\ResumeController;
use App\Http\Controllers\UserCompanyLinkController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function(){
    Route::get("/healthcheck",function(){
        return response()->json(["message" => "Hello from jobhound ~ ishaan"]);
    });
    Route::prefix("user")->group(function(){
        Route::post("/register",[UserController::class,"register"]);
        Route::post("/login",[UserController::class,"login"]);
        Route::get("/data",[UserController::class,"getUserData"]);
   });

    Route::middleware(["auth:sanctum"])->group(function(){
        Route::prefix("get")->group(function(){
            Route::get("company-links",[UserCompanyLinkController::class,"getCompanyLinks"]);
            Route::get("resume",[ResumeController::class,"getResumes"]);
        });
        Route::prefix("create")->group(function(){
            Route::post("company-link",[UserCompanyLinkController::class,"createCompanyLink"]);
            Route::post("resume",[ResumeController::class,"createResume"]);
        });
        Route::prefix("update")->group(function(){
            Route::put("company-link/{id}",[UserCompanyLinkController::class,"updateCompanyLink"]);
        });
        Route::prefix("delete")->group(function(){
            Route::delete("company-link/{id}",[UserCompanyLinkController::class,"deleteCompanyLink"]);
            Route::delete("resume/{id}",[ResumeController::class,"deleteResume"]);
        });
    });
});