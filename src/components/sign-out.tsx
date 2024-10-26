"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Success } from "./ui/sonner";
import { Button } from "./ui/button";

interface SignOutProps extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  children?: React.ReactNode;
}

const SignOut = ({...props}: SignOutProps) => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully", {
        icon: <Success />,
      });
    } catch (error) {
      console.error("Error while logging out => ", error);
    }
  };

  if (!session?.user) return null;

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild className="hidden">
        <Button variant={"outline"} className="p-2">
          <LogOutIcon size={18} />
          {/* <p className="text-sm">Logout</p> */}
        </Button>
        {/* <div className="flex w-full justify-center items-center gap-1">
          <LogOutIcon size={16} />
          <p className="text-sm">Logout</p>
        </div> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-sm">
            You will be returning to sign in page...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleLogout()}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOut;
