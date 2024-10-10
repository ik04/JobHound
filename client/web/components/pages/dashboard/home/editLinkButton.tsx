import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { CompanyLink } from "@/app/types/Api";
import axios from "axios";

interface EditLinkButtonProps {
  companyLink: CompanyLink;
  handleUpdate: (companyLink: CompanyLink) => void;
}

export const EditLinkButton: React.FC<EditLinkButtonProps> = ({
  companyLink,
  handleUpdate,
}) => {
  const [title, setTitle] = useState(companyLink.title);
  const [link, setLink] = useState(companyLink.link);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCompanyLink = async () => {
    try {
      const updatedLink = {
        id: companyLink.id,
        title: title,
        link: link,
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/update/company-link/${companyLink.id}`,
        {
          title,
          link,
        }
      );
      handleUpdate(updatedLink);
      setError(null);
      setOpen(false);
    } catch (error) {
      console.error("Error updating company link:", error);
      setError("Failed to update the company link. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-highlight">
        <p className="text-sm cursor-pointer">Edit</p>
      </DialogTrigger>
      <DialogContent className="">
        <DialogTitle className="text-xl text-highlight font-base">
          Edit Link
        </DialogTitle>
        <DialogDescription className="text-highlight">
          edit your link
        </DialogDescription>
        <Label className="text-base text-highlight font-base">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-highlight text-highlight font-base"
        />
        <Label className="text-base text-highlight font-base">Link</Label>
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-highlight text-highlight font-base"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
        {/* Display error if it exists */}
        <Button
          onClick={updateCompanyLink}
          className="button bg-highlight uppercase hover:text-highlight hover:border-highlight border border-highlight mt-3"
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};
