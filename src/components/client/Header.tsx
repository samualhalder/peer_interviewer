"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiSearch, CiUser } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { GoSignOut } from "react-icons/go";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

import { toast } from "@/hooks/use-toast";
import { FrontEndUser } from "@/types/type";

import { signOutFunction } from "@/actions/user";

export default function Header({ user }: { user: FrontEndUser | null }) {
  const pathname = usePathname();
  const dropDownRef = useRef(null);
  const navigator = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" fixed top-0 h-[60px] bg-[#2E82D6] w-full flex items-center px-5 gap-5">
        {/* Logo Section */}
        <div>
          <h1 className="hidden sm:block text-white text-2xl tracking-widest text-bold font-mono">
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
              <div
                ref={dropDownRef}
                className=" opacity-80 delay-150 transition-all absolute top-[66px] right-2 bg-[#2E82D6] text-white p-4 h-[170px] w-[200px] rounded-l-lg rounded-br-lg"
              >
                <div>
                  <Link
                    href={"/profile"}
                    className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3 cursor-pointer"
                  >
                    <CiUser />
                    Profile
                  </Link>
                  <p className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3 cursor-pointer">
                    <RxDashboard />
                    Dasboard
                  </p>
                  <Separator />
                  <form
                    className="p-2 m-1 hover:bg-blue-400 rounded-lg flex items-center gap-3"
                    action={async () => {
                      await signOutFunction();
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
            <form
              className="flex gap-2"
              action={(formData: FormData) => {
                const s = formData.get("slug") as string;
                const slug = s.trim().split(" ").join("-");
                navigator.push(`/searchresults/${slug}`);
              }}
            >
              <Input
                name="slug"
                placeholder="Serch for peer"
                className=" hidden sm:block"
              />
              <Button variant={"outline"}>
                <CiSearch />
              </Button>
            </form>
            {user ? (
              <Avatar onClick={() => setShowMenu((pre) => !pre)}>
                <AvatarImage src={`${user?.photoURL}`} />
                <AvatarFallback>
                  {user.firstName[0].toLocaleUpperCase()}
                  {user.lastName[0].toLocaleUpperCase()}
                </AvatarFallback>

                {/* The div that shows on hover */}
              </Avatar>
            ) : (
              <Link href={"/signin"}>
                <Button>SignIn</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
