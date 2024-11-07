import { getUserData } from "@/actions/user";
import { auth } from "@/auth";
import Loader from "@/components/client/Loader";
import RightProfile from "@/components/client/RightProfile";
import { LeftProfile } from "@/components/server/LeftProfile";
import { FrontEndUser } from "@/types/type";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

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
      <Suspense fallback={<Loader />}>
        <LeftProfile user={user} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <RightProfile email={user.email} />
      </Suspense>
    </div>
  );
}
