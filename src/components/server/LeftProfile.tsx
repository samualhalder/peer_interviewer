import { FrontEndUser } from "@/types/type";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import ImageUploader from "../client/ImageUploader";
import UpdateUserFrom from "../client/UpdateUserFrom";

export function LeftProfile({ user }: { user: FrontEndUser }) {
  return (
    <div className="w-[30%] min-h-screen border-2 border-[#2E82D6] p-5 flex flex-col items-center gap-3">
      <div className="w-[300px] h-[300px]  rounded-full overflow-hidden border-2 border-blue-300 ">
        <Image
          src={user.photoURL}
          width={300}
          height={300}
          alt="image-user"
        ></Image>
      </div>
      <ImageUploader userEmail={user.email} />
      <div className="font-thin text-blue-500">
        <p className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</p>
        <p className="font-semibold">{user.email}</p>
      </div>
      <Separator />
      <div className="w-full p-2 ">
        <h2 className="text-2xl mb-5">Edit Profile</h2>
        <UpdateUserFrom email={user.email} />
      </div>
    </div>
  );
}
