import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpForm from "./sign-up-form";

function SignUpPage() {
  return (
    <div className="grid h-full grid-cols-5">
      <div className="col-span-5 flex items-center justify-center lg:col-span-2">
        <Card className="w-full max-w-md bg-white p-4 text-color2">
          <CardHeader>
            <CardTitle>Welcome Back!!</CardTitle>
            <CardDescription>
              Please enter your details to login...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-3 hidden items-center lg:flex">
        <Image
          src="/image3.jpg"
          alt="image"
          width={800}
          height={600}
          quality={100}
          className="rounded-xl bg-cover"
        />
      </div>
    </div>
  );
}

export default SignUpPage;
