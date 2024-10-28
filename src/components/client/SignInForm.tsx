"use client";
import { toast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { credentialSignIn } from "@/actions/user";

export function SignInForm() {
  const router = useRouter();
  return (
    <>
      <form
        className="w-full flex  flex-col gap-5"
        action={async (fromData: FormData) => {
          const email = fromData.get("email") as string;
          const password = fromData.get("password") as string;
          if (!email || !password) {
            toast({
              variant: "destructive",
              description: "Enter all the fields.",
            });
            return;
          }
          const err = await credentialSignIn(email, password);
          if (err) {
            toast({
              variant: "destructive",
              description: String(err),
            });
          } else {
            toast({
              description: "Signin Success",
            });
            router.push("/");
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

        <Button className="w-[95%]" type="submit">
          Sign In
        </Button>
      </form>
    </>
  );
}
