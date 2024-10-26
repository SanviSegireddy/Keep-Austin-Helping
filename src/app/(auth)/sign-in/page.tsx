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
    <div className="h-full grid grid-cols-5 ">
      <div className="col-span-3 flex justify-end items-center">
        <Image
          src="/image2.jpg"
          alt="image"
          width={800}
          height={600}
          quality={100}
          className="bg-cover rounded-xl"
        />
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <Card className="w-full max-w-md p-4 text-color2/70 bg-white">
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
