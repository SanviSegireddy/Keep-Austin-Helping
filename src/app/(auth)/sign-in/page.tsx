import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignInForm from "./sign-in-form";

function SignInPage() {
  return (
    <div className="grid h-full grid-cols-5">
      <div className="col-span-3 hidden items-center justify-end lg:flex">
        <Image
          src="/image2.jpg"
          alt="image"
          width={800}
          height={600}
          quality={100}
          className="rounded-xl bg-cover"
        />
      </div>
      <div className="col-span-5 flex items-center justify-center lg:col-span-2">
        <Card className="text-color2/70 w-full max-w-md bg-white p-4">
          <CardHeader>
            <CardTitle>Welcome Back!!</CardTitle>
            <CardDescription>
              Please enter your details to login...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignInPage;
