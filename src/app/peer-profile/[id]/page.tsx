import { getUserById } from "@/actions/user";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  const techStack = [...JSON.parse(user?.userProfile?.techStack as string)];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Left Secion */}
      <div className="min-h-screen w-[50%] bg-gray-100 flex flex-col items-center p-5 gap-5">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <Image
            src={user?.photoURL as string}
            height={300}
            width={300}
            alt="image"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl">
            {user?.firstName} {user?.lastName}
          </p>
          <div>
            <p>{user?.userProfile?.organization}</p>
          </div>
          <p className="text-sm">{user?.userProfile?.about}</p>
          <div className="text-[#2E82D6] my-4 flex-wrap">
            {techStack &&
              techStack.map((techs, ind) => <span>{techs} · </span>)}
          </div>
        </div>
        <div className="flex mt-4">
          <Link
            href={user?.userProfile?.linkedin as string}
            className="border-2 bg-blue-500 rounded-lg text-white p-5"
          >
            view linkedin profile
          </Link>
          <Link
            href={user?.userProfile?.resumeLink as string}
            className="border-2 bg-blue-500 rounded-lg text-white p-5"
          >
            view resume
          </Link>
          <Button className="p-8 bg-blue-500">Send interview request</Button>
        </div>
      </div>
    </div>
  );
}
