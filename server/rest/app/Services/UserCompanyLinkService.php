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
    public function getCompanyLinks($userId){
      $links = UserCompanyLink::where("user_id",$userId)->select("title","link","user_id","id")->get();
      return $links;
    } 
    public function updateCompanyLink($userId, $linkId, $title, $link){
        $link = UserCompanyLink::where("user_id",$userId)->where("id",$linkId)->first();
        $link->title = $title;
        $link->link = $link;
        return $link;
    }
    public function deleteCompanyLink($userId, $linkId){
        $link = UserCompanyLink::where("user_id",$userId)->where("id",$linkId)->first();
        $link->delete();
    }
}