"use client";

import { ChevronDown, Edit, ImagePlus, LogOut } from "lucide-react";
import { useState } from "react";

import SignOut from "@/components/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserInfo from "./user-info";
import { Button } from "@/components/ui/button";
import Preferences from "./preferences";
import { UserPreferences } from "@/types";

interface UserActionDropDownProps {
  userPreferences: UserPreferences;
}

const UserActionDropDown = ({ userPreferences }: UserActionDropDownProps) => {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <SignOut open={isSignOutOpen} onOpenChange={setIsSignOutOpen} />
      <Preferences
        userPreferences={userPreferences}
        open={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
      />
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <UserInfo />
            <ChevronDown
              className={`${isDropdownOpen ? "rotate-180" : ""} transition-all duration-300`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
            <ImagePlus />
            Add testimonials
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
