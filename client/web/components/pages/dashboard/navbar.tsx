import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const navLinks = [
    { name: "emails", href: "/dashboard/email" },
    { name: "home", href: "/dashboard/home" },
    { name: "resume", href: "/dashboard/resume" },
  ];
  return (
    <div className="h-24 bg-red-500 flex items-center justify-between px-10 md:px-28">
      <Image
        alt=""
        src={"/assets/wolf.svg"}
        className="w-10 md:w-16"
        width={60}
        height={60}
      />
      <div className="navlinks flex space-x-3">
        {navLinks.map((link) => (
          <Link
            className="capitalize text-base md:text-xl font-base text-highlight"
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <Image
        alt=""
        className="w-8 md:w-12"
        src={"/assets/profile.svg"}
        width={40}
        height={40}
      />
    </div>
  );
};
