<?php

namespace App\Services;

use App\Models\UserCompanyLink;

class UserCompanyLinkService{
    public function createCompanyLink(string $title, string $link, $userId){
        $link = UserCompanyLink::create([
            "title" => $title,
            "link" => $link,
            "user_id" => $userId
        ]);
        return $link;
    }
    public function getCompanyLinks($userId){
      $links = UserCompanyLink::where("user_id",$userId)->select("title","link","id")->get();
      return $links;
    } 
    public function updateCompanyLink($userId, $linkId, $title, $linkUrl){
        $link = UserCompanyLink::where("user_id",$userId)->where("id",$linkId)->first();
        $link->title = $title;
        $link->link = $linkUrl;
        $link->save();
        return $link;
    }
    public function deleteCompanyLink($userId, $linkId){
        $link = UserCompanyLink::where("user_id",$userId)->where("id",$linkId)->first();
        $link->delete();
    }
}