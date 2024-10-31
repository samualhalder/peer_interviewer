import { FrontEndUser } from "@/types/type";
import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ImageUploader from "./ImageUploader";

export function LeftProfile({ user }: { user: FrontEndUser }) {
  return (
    <div className="w-[30%] min-h-screen border-2 border-[#2E82D6] p-5 flex flex-col items-center gap-3">
      <div className="w-[300px] h-[300px] rounded-full overflow-hidden border-2 border-blue-300 ">
        <Image
          src={user.photoURL}
          width={300}
          height={300}
          alt="image-user"
        ></Image>
      </div>
      <ImageUploader userEmail={user.email} />
      <div className="font-thin">
        <p className="text-lg font-bold">@{user.username}</p>
        <p className="font-semibold">{user.email}</p>
      </div>
      <Separator />
      <div className="w-full p-2 ">
        <h2 className="text-2xl mb-5">Edit Profile</h2>
        <form className="w-[100%] flex flex-col items-center flex-grow">
          <div className="w-full">
            <Label htmlFor="username" className="text-gray-500 mb-3">
              Enter new username
            </Label>

            <Input className="w-[95%]" type="text" name="username" />
          </div>
          <div className="w-full">
            <Label htmlFor="email" className="text-gray-500 mb-3">
              Enter new email
            </Label>

            <Input className="w-[95%]" type="text" name="email" />
          </div>

          <div className="w-full">
            <Label htmlFor="password" className="text-gray-500 mb-3">
              Enter Your new Password
            </Label>

            <Input
              className="w-[95%]"
              type="password"
              name="password"
              autoComplete="current-password"
            ></Input>
          </div>
          <div className="w-full">
            <Label htmlFor="password" className="text-gray-500 mb-3">
              {"Choose a profile picture (Under 2MB)"}
            </Label>

            <Input
              className="w-[95%]"
              type="file"
              name="photoURL"
              autoComplete="current-password"
            ></Input>
          </div>

          <Button className="w-[100%] mt-3" type="submit">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  );
}
