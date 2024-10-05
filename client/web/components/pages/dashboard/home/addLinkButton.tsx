import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
// todo: better validation and sanitization on serverside and client side
// todo: handle errors everywhere
export const AddLinkButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col space-y-3 justify-center items-center bg-gray-700 rounded-xl h-full w-full">
        <p className="text-6xl text-highlight font-base">+</p>
        <p className="text-xl text-highlight font-base">Add Link</p>
      </DialogTrigger>
      <DialogContent className="">
        <p className="text-xl text-highlight font-base">Add Link</p>
        <Label className="text-base text-highlight font-base">Title</Label>
        <Input className="border border-highlight text-highlight font-base" />
        <Label className="text-base text-highlight font-base">Link</Label>
        <Input className="border border-highlight text-highlight font-base" />
        <Button className="button bg-highlight uppercase hover:text-highlight hover:border-highlight border border-highlight mt-3">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};
