import { getUserData } from "@/actions/user";
import { auth } from "@/auth";
import { LeftProfile } from "@/components/client/LeftProfile";
import { FrontEndUser } from "@/types/type";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const userSession = await auth();
  if (!userSession) {
    redirect("/signin");
  }
  const user = (await getUserData(
    String(userSession.user?.email)
  )) as FrontEndUser;

  return (
    <>
      <LeftProfile user={user} />
    </>
  );
}
