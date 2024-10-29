"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiSearch, CiUser } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { GoSignOut } from "react-icons/go";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

import { signOutFunction } from "@/actions/user";
import { toast } from "@/hooks/use-toast";

export default function Header() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className=" fixed top-0 h-[60px] bg-[#2E82D6] w-full flex items-center px-5 gap-5">
        {/* Logo Section */}
        <div>
          <h1 className="hidden text-white text-2xl tracking-widest text-bold font-mono">
            PeerInterviewer
          </h1>
        </div>
        {/* Link Sections */}
        <div className="flex text-white gap-5 md:mx-10">
          <Link href={"/"}>
            <p className={`${pathname === "/" ? "font-bold" : " "}`}>Home</p>
          </Link>
          <Link href={"/about"}>
            <p className={`${pathname === "/about" ? "font-bold" : " "}`}>
              About
            </p>
          </Link>
        </div>
        {/* Search Bar and Avatar */}
        <div className=" flex-grow flex justify-end">
          <div className="w-[40%] flex gap-5">
            {showMenu && (
              <div className=" opacity-80 delay-150 absolute top-[62px] right-2 bg-[#2E82D6] text-white p-4 h-[170px] w-[200px] rounded-l-lg rounded-br-lg">
                <div>
                  <p className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3 cursor-pointer">
                    <CiUser />
                    Profile
                  </p>
                  <p className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3 cursor-pointer">
                    <RxDashboard />
                    Dasboard
                  </p>
                  <Separator />
                  <form
                    className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3"
                    action={async () => {
                      signOutFunction();
                      toast({
                        description: "Sign out successfull",
                      });
                    }}
                  >
                    <GoSignOut />
                    <button>SignOut</button>
                  </form>
                </div>
              </div>
            )}
            <Input placeholder="Serch for peer" className=" hidden sm:block" />
            <Button>
              <CiSearch />
            </Button>
            <Avatar onClick={() => setShowMenu((pre) => !pre)}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
}
