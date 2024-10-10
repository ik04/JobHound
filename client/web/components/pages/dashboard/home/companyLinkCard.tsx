"use client";
import { CompanyLink } from "@/app/types/Api";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import axios from "axios";
import { EditLinkButton } from "./editLinkButton";

const getFaviconUrl = (link: string) => {
  try {
    const url = new URL(link);
    return `${url.origin}/favicon.ico`;
  } catch (error) {
    console.error("Invalid URL: ", link);
    return "/default-favicon.ico";
  }
};

interface CompanyLinkCardProps {
  companyLink: CompanyLink;
  handleDeletion: (id: number) => void;
  handleUpdate: (updatedLink: CompanyLink) => void;
}

export const CompanyLinkCard: React.FC<CompanyLinkCardProps> = ({
  companyLink,
  handleDeletion,
  handleUpdate,
}) => {
  const faviconUrl = getFaviconUrl(companyLink.link);

  const deleteCompanyLink = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/delete/company-link/${companyLink.id}`
      );
      handleDeletion(companyLink.id); // Update parent state after deletion
    } catch (error) {
      console.error("Error deleting company link:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-full">
        <Link
          key={companyLink.id}
          href={companyLink.link}
          target="_blank"
          className="flex flex-col space-y-3 justify-center items-center bg-gray-700 rounded-xl h-full w-full"
        >
          <Image alt="" src={faviconUrl} width={50} height={50} />
          <div className="text-xl text-highlight font-base">
            {companyLink.title}
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <div className="px-2">
          <EditLinkButton
            handleUpdate={handleUpdate}
            companyLink={companyLink}
          />
        </div>
        <ContextMenuItem onClick={deleteCompanyLink} className="text-red-500">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
