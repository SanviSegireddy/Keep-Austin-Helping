"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Loader2, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateUserForm from "./update-user-form";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/actions/auth";
import { Error, Success } from "@/components/ui/sonner";

interface UpdateUserModalProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  userName: string;
}

const UpdateUserModal = ({ ...props }: UpdateUserModalProps) => {
  const [isDeletionPending, startDeletionTransition] = useTransition();

  const handleDelete = () => {
    startDeletionTransition(async () => {
      if (isDeletionPending) return;

      const response = await deleteUser();

      if (response.status === "error") {
        toast.error(response.message, {
          icon: <Error />,
        });
        return;
      }

      if (response.status === "success") {
        await signOut();
        toast.success(response.message, {
          icon: <Success />,
        });
      }
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update user info</DialogTitle>
          <DialogDescription>Update your details here...</DialogDescription>
        </DialogHeader>
        <div>
          <UpdateUserForm
            setOpen={props?.onOpenChange}
            userName={props?.userName}
          />
          <div className="mx-auto my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={handleDelete}
          >
            {isDeletionPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="h-4 w-4" />
            )}
            Delete your account permanently
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
