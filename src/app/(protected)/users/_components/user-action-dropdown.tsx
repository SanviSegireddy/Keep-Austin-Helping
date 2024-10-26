"use client";

import { ChevronDown, Edit, LogOut } from "lucide-react";
import { useState } from "react";

import SignOut from "@/components/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Preferences from "./preferences";
import { UserPreferences } from "@/types";
import UpdateUserModal from "./update-user-modal";

interface UserActionDropDownProps {
  userPreferences: UserPreferences;
  userName: string;
}

const UserActionDropDown = ({
  userPreferences,
  userName,
}: UserActionDropDownProps) => {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  return (
    <>
      <UpdateUserModal
        open={isUpateUserModalOpen}
        onOpenChange={setIsUpdateUserModalOpen}
        userName={userName}
      />
      <SignOut hidden open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
      <Preferences
        userPreferences={userPreferences}
        open={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
      />
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <p className="text-lg">{userName}</p>
            <ChevronDown
              className={`${isDropdownOpen ? "rotate-180" : ""} transition-all duration-300`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => setIsUpdateUserModalOpen(true)}
            className="flex items-center gap-1"
          >
            <Edit />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setIsPreferencesOpen(true)}
            className="flex items-center gap-1"
          >
            <Edit />
            Edit Preferences
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setIsSignOutOpen(true)}
            className="flex items-center gap-1"
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserActionDropDown;
