"use client";

import { useSession } from "next-auth/react";

function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  return <p className="font-merriweather text-xl">{session?.user?.name}</p>;
}

export default UserInfo;
