import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React from "react";
import { SignUpForm } from "@/components/client/SignUpForm";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" shadow-2xl w-[400px] min-h-[600px] p-10 flex justify-center items-center flex-col relative gap-3 rounded-md">
        <h1 className=" absolute top-3 text-3xl tracking-widest font-sans font-semibold">
          Sign Up
        </h1>
        <SignUpForm />

        <form action="" className="w-full">
          <Button color="success" className="w-[95%]">
            <FcGoogle className="mr-5" size={20} />
            Continue With Google
          </Button>
        </form>
        <Link
          className="text-blue-500 mt-10 hover:text-blue-300"
          href={`/signin`}
        >
          already have an account? sign in
        </Link>
      </div>
    </div>
  );
}
