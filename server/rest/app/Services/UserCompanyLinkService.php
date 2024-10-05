<?php

namespace App\Services;

use App\Models\UserCompanyLink;

class UserCompanyLinkService{
    public function createCompanyLink(string $title, string $link, $userId){
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