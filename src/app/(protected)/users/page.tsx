import React from "react";
import { getServerSession } from "next-auth";
import OpportunityList from "./_components/opportunity-list";
import { authOptions } from "@/lib/options";
import { db } from "@/lib/db";
import { UserPreferences } from "@/types";
import UserActionDropDown from "./_components/user-action-dropdown";
import Logo from "@/components/logo";
import ImageUploader from "@/components/image-uploader";

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
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-2">
        <Logo />
        <div className="flex items-center gap-2">
          <UserActionDropDown userPreferences={preferences} />
          <ImageUploader />
        </div>
      </div>
      <OpportunityList />;
    </div>
  );
}

export default UserPage;
