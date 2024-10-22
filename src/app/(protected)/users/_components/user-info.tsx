"use client";

import SignOut from "@/components/sign-out";
import { useSession } from "next-auth/react";
import React from "react";
import UploadImage from "@/components/upload-image";

function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-xl">{session?.user?.name}</p>
      <SignOut />
      <UploadImage />
    </div>
  );
}

export default UserInfo;
