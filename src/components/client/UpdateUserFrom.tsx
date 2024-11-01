"use client";
import { updateUser } from "@/actions/user";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function UpdateUserFrom({ email }: { email: string }) {
  return (
    <>
      <form
        className="w-[100%] flex flex-col items-center flex-grow"
        action={async (formData: FormData) => {
          try {
            await updateUser(formData, email);
            toast({
              description: "user updated successfully",
            });
          } catch (error) {
            toast({
              variant: "destructive",
              description: String(error.message),
            });
          }
        }}
      >
        <div className="w-full">
          <Label htmlFor="firstName" className="text-gray-500 mb-3">
            Enter new First Name
          </Label>

          <Input className="w-[95%]" type="text" name="firstName" />
        </div>
        <div className="w-full">
          <Label htmlFor="lastName" className="text-gray-500 mb-3">
            Enter new Last Name
          </Label>

          <Input className="w-[95%]" type="text" name="lastName" />
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

        <Button className="w-[100%] mt-3" type="submit">
          Save changes
        </Button>
      </form>
    </>
  );
}
