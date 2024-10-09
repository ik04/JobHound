import { CompanyLink } from "@/app/types/Api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const getFaviconUrl = (link: string) => {
  try {
    const url = new URL(link);
    return `${url.origin}/favicon.ico`;
  } catch (error) {
    console.error("Invalid URL: ", link);
    return "/default-favicon.ico";
  }
};

export const CompanyLinkCard = (companyLink: CompanyLink) => {
  const faviconUrl = getFaviconUrl(companyLink.link);
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
        <ContextMenuItem className="text-highlight">Edit</ContextMenuItem>
        <ContextMenuItem className="text-red-500">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
