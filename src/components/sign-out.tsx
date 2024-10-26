"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
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

interface SignOutProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  children?: React.ReactNode;
  hidden?: boolean;
}

const SignOut = ({ hidden, ...props }: SignOutProps) => {
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
      <AlertDialogTrigger asChild className={`${hidden ? "hidden" : ""}`}>
        <p className="flex h-24 w-32 items-center justify-center gap-2 rounded-b-3xl bg-color2 transition-all duration-200 hover:h-28 hover:cursor-pointer hover:text-lg hover:text-white">
          Logout
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
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
