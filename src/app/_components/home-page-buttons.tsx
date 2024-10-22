"use client";

import SearchDialog from "@/components/search-dialog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function HomePageButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-x-4 text-color6">
      {!session?.user && (
        <Link
          href="/sign-in"
          className="flex flex-col h-24 w-28 rounded-b-3xl items-center justify-center bg-color2 font-merriweather hover:h-28 hover:text-lg duration-200 transition-all hover:text-white"
        >
          Sign In
        </Link>
      )}
      {session?.user && (
        <Link
          href="/users"
          className="flex flex-col h-24 w-28 rounded-b-3xl items-center justify-center bg-color2 font-merriweather hover:h-28 hover:text-lg duration-200 transition-all hover:text-white"
        >
          <span>Your</span>
          <span>Account</span>
        </Link>
      )}
      <SearchDialog />
      {!session?.user && (
        <Link
          href="/sign-up"
          className="flex flex-col h-24 w-28 rounded-b-3xl items-center justify-center bg-color2 font-merriweather hover:h-28 hover:text-lg duration-200 transition-all hover:text-white"
        >
          <span>Create an</span>
          <span>Account</span>
        </Link>
      )}
    </div>
  );
}

export default HomePageButtons;
