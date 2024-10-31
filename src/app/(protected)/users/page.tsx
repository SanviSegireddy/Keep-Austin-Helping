import React from "react";
import { getServerSession } from "next-auth";
import OpportunityList from "./_components/opportunity-list";
import { authOptions } from "@/lib/options";
import { db } from "@/lib/db";
import { UserPreferences } from "@/types";
import UserActionDropDown from "./_components/user-action-dropdown";
import Logo from "@/components/logo";

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

  const userName = data?.fistName + " " + data?.lastName;

  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-2">
        <Logo />
        <div className="flex items-center gap-2">
          <UserActionDropDown
            userPreferences={preferences}
            userName={userName}
          />
        </div>
      </div>
      <div className="flex grow justify-center px-2 pt-10">
        <OpportunityList />
      </div>
    </div>
  );
}

export default UserPage;
