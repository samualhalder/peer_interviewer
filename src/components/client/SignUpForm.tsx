"use client";
import { toast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/user";
import { useRouter } from "next/navigation";



export function SignUpForm() {
  const router = useRouter();
  return (
    <>
      <form
        className="w-full flex  flex-col gap-5"
        action={async (fromData: FormData) => {
          const username = fromData.get("username");
          const email = fromData.get("email");
          const password = fromData.get("password");
          if (!email || !username || !password) {
            toast({
              variant: "destructive",
              description: "Enter all the fields.",
            });
            return;
          }
          try {
            await register(fromData);
            toast({
              description: "sign up successfull.",
            });
            router.push("/signin");
          } catch (error) {
            toast({
              variant: "destructive",
              description: String(error.message),
            });
          }
        }}
      >
        <div>
          <Label htmlFor="email" className="text-gray-500 mb-3">
            Your email address
          </Label>

          <Input
            className="w-[95%]"
            type="Email"
            name="email"
            autoComplete="current-email"
          />
        </div>

        <div>
          <Label htmlFor="username" className="text-gray-500 mb-3">
            Your username
          </Label>

          <Input
            className="w-[95%]"
            type="text"
            name="username"
            autoComplete="current-email"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-500 mb-3">
            Your Password
          </Label>

          <Input
            className="w-[95%]"
            type="password"
            name="password"
            autoComplete="current-password"
          ></Input>
        </div>

        {
          <Button className="w-[95%]" type="submit">
            Sign Up
          </Button>
        }
      </form>
    </>
  );
}
