<?php

namespace App\Services;

use App\Enums\Role;
use App\Exceptions\AlreadyDemotedException;
use App\Exceptions\AlreadyPromotedException;
use App\Exceptions\IncorrectPasswordException;
use App\Exceptions\UserNotFoundException;
use App\Models\User;
use App\Models\UserCompanyLink;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;

class UserComapnyLinkService{
    public function createComanyLink(string $title, string $link, $userId){
        UserCompanyLink::create([
            "title" => $title,
            "link" => $link,
            "user_id" => $userId
        ]);
    }
    public function getComanyLinks($userId){
      $links = UserCompanyLink::where("title,link,user_id,id")->get();
    } 
}