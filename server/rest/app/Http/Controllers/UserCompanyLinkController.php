<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyLinkRequest;
use App\Http\Requests\UpdateCompanyLinkRequest;
use App\Services\UserComapnyLinkService;
use Illuminate\Http\Request;

class UserCompanyLinkController extends Controller
{
    public function __construct(protected UserComapnyLinkService $service)
    {
    }

    public function getCompanyLinks(Request $request){
        $links = $this->service->getCompanyLinks($request->user()->id);
        return response()->json(["links" => $links],200);
    }

    public function createCompanyLink(CreateCompanyLinkRequest $request){
    $validated = $request->validated();
    $link = $this->service->createComanyLink($validated["title"],$validated["link"],$request->user()->id);
    return response()->json(["link" => $link,"message" => "link created!"]);
    }

    public function updateCompanyLink(UpdateCompanyLinkRequest $request, int $id){
        $validated = $request->validated();
        $link = $this->service->updateCompanyLink($request->user()->id, $id, $validated["title"],$validated["link"]);
        return response()->json(["link" => $link],200);
    }
    public function deleteCompanyLink(Request $request, int $id){
        $validated = $request->validated();
        $link = $this->service->deleteCompanyLink($request->user()->id, $id);
        return response()->json(["message" => "Link Removed!"],200);
    }

}
