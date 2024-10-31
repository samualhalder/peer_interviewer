"use client";

import { imageUploadDB } from "@/actions/user";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function ImageUploader({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          // Do something with the response
          await imageUploadDB(res[0].url, userEmail);
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
