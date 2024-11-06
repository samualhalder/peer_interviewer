import { getUserData } from "@/actions/user";
import { auth } from "@/auth";
import RightProfile from "@/components/client/RightProfile";
import { LeftProfile } from "@/components/server/LeftProfile";
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
    <div className="flex flex-col md:flex-row">
      <LeftProfile user={user} />
      <RightProfile email={user.email} />
    </div>
  );
}
