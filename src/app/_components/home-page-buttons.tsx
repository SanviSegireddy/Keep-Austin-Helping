"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import SearchDialog from "@/components/search-dialog";
import SignOut from "@/components/sign-out";

function HomePageButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-x-4 text-color6">
      {!session?.user && (
        <Link
          href="/sign-in"
          className="flex h-24 w-32 flex-col items-center justify-center rounded-b-3xl bg-color2 font-merriweather transition-all duration-200 hover:h-28 hover:text-lg hover:text-white"
        >
          Sign In
        </Link>
      )}
      {session?.user && (
        <Link
          href="/users"
          className="flex h-24 w-32 flex-col items-center justify-center rounded-b-3xl bg-color2 font-merriweather transition-all duration-200 hover:h-28 hover:text-lg hover:text-white"
        >
          <span>Your</span>
          <span>Account</span>
        </Link>
      )}
      <SearchDialog />
      {!session?.user && (
        <Link
          href="/sign-up"
          className="flex h-24 w-32 flex-col items-center justify-center rounded-b-3xl bg-color2 transition-all duration-200 hover:h-28 hover:text-lg hover:text-white"
        >
          <span>Create an</span>
          <span>Account</span>
        </Link>
      )}
      {session?.user && <SignOut />}
    </div>
  );
}

export default HomePageButtons;
