<?php

namespace App\Services;

use App\Exceptions\ResumeNotFoundException;
use App\Models\Resume;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ResumeService{
    public function getResumes(int $userId){
        $resumes = Resume::where("user_id",$userId)->select("file_url","title","user_id","id")->get();
        return $resumes;
    }

    public function createResume(int $userId, UploadedFile $file, string $title){
        $fileName = time().".".$title.".".$file->getClientOriginalExtension();
        Storage::disk("public")->put("resumes/$fileName",file_get_contents($file));
        $resume = Resume::create([
            "title" => $title,
            "file_url" => Storage::url("resumes/$fileName"),
            "user_id" => $userId
        ]);
        return $resume;
    }

    public function deleteResume(int $userId, int $resumeId){
        $resume = Resume::where("id",$resumeId)->where("user_id",$userId)->first();
        if (!$resume) {
            throw new ResumeNotFoundException("Resume not found!",404);
        }
        $file = $resume->file_url;
        $file = str_replace('/storage/', '', $resume->file_url);
        if (Storage::disk("public")->exists($file)) {
            Storage::disk("public")->delete($file);
        } else {
            throw new FileNotFoundException("Resume File Missing!",404);
        }
        $resume->delete();
    }
}