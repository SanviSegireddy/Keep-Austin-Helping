"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
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
import { SignInSchema } from "@/lib/zod";
import { FormError } from "@/components/ui/custom/form-error";
import { Success } from "@/components/ui/sonner";
import SpinnerButton from "@/components/ui/custom/spinner-button";

const SignInForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setError("");
    const { email, password } = values;

    startTransition(async () => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      router.replace("/users");
      toast.success("User logged in", {
        icon: <Success />,
      });
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
                      autoComplete="password"
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
            Sign In
          </SpinnerButton>
        </form>
        <div className="flex items-center justify-evenly w-full mx-auto my-6 before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="w-full text-center">
          Don&apos;t have an account?&nbsp;
          <Link
            className={`text-blue-500 hover:underline ${
              isPending ? "pointer-events-none" : ""
            }`}
            href="/sign-up"
          >
            Register here
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInForm;
