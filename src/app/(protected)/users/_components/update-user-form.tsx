"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema } from "@/lib/zod";
import { FormError } from "@/components/ui/custom/form-error";
import { Success } from "@/components/ui/sonner";
import SpinnerButton from "@/components/ui/custom/spinner-button";
import { updateUserById } from "@/actions/auth";
import { useSession } from "next-auth/react";

interface UpdateUserModalProps {
  setOpen?: (open: boolean) => void;
  userName: string;
}

const UpdateUserForm = ({ setOpen, userName }: UpdateUserModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      fistName: userName?.split(" ")[0] || "",
      lastName: userName?.split(" ")[1] || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");

    startTransition(async () => {
      const response = await updateUserById(
        session?.user?.id as string,
        values
      );

      if (response.status === "error") {
        setError(response.message);
        return;
      }

      if (response.status === "info") {
        setError(response.message);
        return;
      }

      if (response.status === "success") {
        toast.success(response.message, {
          icon: <Success />,
        });
        setOpen?.(false);
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fistName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Fist name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="John"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="fistName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="doe"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="lastName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />

          <SpinnerButton
            isPending={isPending}
            disabled={isPending}
            className="w-full bg-color2 hover:bg-color2"
            type="submit"
          >
            Update
          </SpinnerButton>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserForm;
