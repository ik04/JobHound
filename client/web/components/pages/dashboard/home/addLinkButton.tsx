"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
// todo: better validation and sanitization on serverside and client side
// todo: handle errors everywhere
export const AddLinkButton = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const addCompanyLink = async () => {
    if (!(title && link)) {
      toast({
        variant: "destructive",
        title: "Required",
        description: "Both title and link required!",
      });
    }
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/create/company-link`,
      { title, link },
      { withCredentials: true }
    );
  };
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col space-y-3 justify-center items-center bg-gray-700 rounded-xl h-full w-full">
        <p className="text-6xl text-highlight font-base">+</p>
        <p className="text-xl text-highlight font-base">Add Link</p>
      </DialogTrigger>
      <DialogContent className="">
        <p className="text-xl text-highlight font-base">Add Link</p>
        <Label className="text-base text-highlight font-base">Title</Label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="border border-highlight text-highlight font-base"
        />
        <Label className="text-base text-highlight font-base">Link</Label>
        <Input
          onChange={(e) => setLink(e.target.value)}
          className="border border-highlight text-highlight font-base"
        />
        <Button
          onClick={addCompanyLink}
          className="button bg-highlight uppercase hover:text-highlight hover:border-highlight border border-highlight mt-3"
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};
