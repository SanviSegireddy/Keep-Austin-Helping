"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/custom/password-input";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/lib/zod";
import { FormError } from "@/components/ui/custom/form-error";
import { Success } from "@/components/ui/sonner";
import SpinnerButton from "@/components/ui/custom/spinner-button";
import { createUser } from "@/actions/auth";

const SignUpForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      fistName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setError("");

    startTransition(async () => {
      const response = await createUser(values);

      if (response.status === "error") {
        setError(response.message);
        return;
      }

      if (response.status === "info") {
        setError(response.message);
        return;
      }

      if (response.status === "success") {
        router.push("/sign-in");
        toast.success(response.message, {
          icon: <Success />,
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="abc@example.com"
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="email"
                      suffix={<Mail className="size-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={isPending}
                        placeholder="********"
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={isPending}
                        placeholder="********"
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />

          <SpinnerButton
            isPending={isPending}
            disabled={isPending}
            className="w-full bg-color2 hover:bg-color2"
            type="submit"
          >
            Sign Up
          </SpinnerButton>
        </form>
        <div className="flex items-center justify-evenly w-full mx-auto my-6 before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="w-full text-center">
          Already have an account?&nbsp;
          <Link
            className={`text-blue-500 hover:underline ${
              isPending ? "pointer-events-none" : ""
            }`}
            href="/sign-in"
          >
            Login here
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
