"use client";

import SignOut from "@/components/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadImage from "@/components/upload-image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ActionDropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen}>
      <DropdownMenuTrigger>
        <ChevronDown onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsDropdownOpen(false)}>
          <UploadImage />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
