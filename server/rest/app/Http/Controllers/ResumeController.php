<?php

namespace App\Http\Controllers;

use App\Exceptions\ResumeNotFoundException;
use App\Http\Requests\CreateResumeRequest;
use App\Services\ResumeService;
use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    public function __construct(protected ResumeService $service)
    {
        
    }

    // the share feature is purely froentend and can allow you to directly send your link 
    public function getResumes(Request $request){
        $resumes = $this->service->getResumes($request->user()->id);
        return response()->json(["resumes" => $resumes],200);
    }

    public function createResume(CreateResumeRequest $request){
        $validated = $request->validated();
        $resume = $this->service->createResume($request->user()->id, $validated["resume"], $validated["title"]);
        return response()->json(["resume" => $resume, "message" => "Resume created succesfully!"]);
    }

    public function deleteResume(Request $request, int $id){
        try{
            $this->service->deleteResume($request->user()->id, $id);    
            return response()->json(["message" => "Resume deleted!"]);
        }
        catch(ResumeNotFoundException $e){
            return response()->json(["error" => $e->getMessage()],$e->getCode());
        }
        catch(FileNotFoundException $e){
            return response()->json(["error" => $e->getMessage()],$e->getCode());
        }
        catch(Exception $e){
            return response()->json(["error" => $e->getMessage()]);
        }
    }
}
