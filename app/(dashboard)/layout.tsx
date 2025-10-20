import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import { getUserFromSession } from "@/libs/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("session");

  if (!userCookie) {
    redirect("/login");
  }

  const user = await getUserFromSession();
  console.log("user", user);
  return (
    <>
      <Navbar user={user || null} />

      {children}
    </>
  );
}
