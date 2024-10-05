import { Navbar } from "@/components/pages/dashboard/navbar";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function SlipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const at = cookieStore.get("token");
  if (at == undefined || at == null) {
    return redirect("/login");
  }
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/data`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${at?.value}`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status == 401) {
      return redirect("/login");
    }
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
