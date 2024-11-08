import { getSearchUsers } from "@/actions/user";

import Image from "next/image";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const searchSlug = slug.split("-");
  const results = await getSearchUsers(searchSlug);

  return (
    <div className="h-screen flex justify-center p-5">
      <div className="w-[90%] flex flex-wrap ">
        {results &&
          results.map((result, ind) => (
            <div
              key={ind}
              className="border-2 border-[#2E82D6] p-4 m-4 w-[350px] h-[400px] flex flex-col items-center cursor-pointer gap-5 rounded-md"
            >
              <div className="h-[250px] w-[250px] rounded-full overflow-hidden ">
                <Image
                  src={String(result?.user?.photoURL)}
                  width={250}
                  height={250}
                  alt="avatar"
                />
              </div>
              <div className="mx-auto">
                <p className="text-2xl ">
                  {result.user.firstName} {result.user.lastName}
                </p>
                <p className="text-lg">{result.organization}</p>
              </div>
              <p className="w-full text-center">
                {result.about?.slice(0, 42)}...
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
