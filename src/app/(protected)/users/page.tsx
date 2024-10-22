import React from "react";
import OpportunityList from "./_components/opportunity-list";
import UserInfo from "./_components/user-info";
import Link from "next/link";
import Preferences from "./_components/preferences";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { UserPreferences } from "@/types";

async function UserPage() {
  const user = await getServerSession(authOptions).then((res) => res?.user);

  const data = await db.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  const { preferredCategories, preferredLocations } = data!;

  const preferences: UserPreferences = {
    userCategories: preferredCategories ? preferredCategories.split("|") : [],
    userLocations: preferredLocations ? preferredLocations.split("|") : [],
  };

  return (
    <div>
      <div className="w-full flex py-2 justify-between px-4 items-center">
        <Link
          href={"/"}
          className="font-bold font-mono text-xl uppercase tracking-tight"
        >
          Keep Austin Helping
        </Link>
        <div className="flex gap-2">
          <UserInfo />
          <Preferences userPreferences={preferences} />
        </div>
      </div>
      <OpportunityList />;
    </div>
  );
}

export default UserPage;
