"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/register");

  return <div>{children}</div>;
}
