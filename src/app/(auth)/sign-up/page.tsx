import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./_components/sign-up-form";
import Image from "next/image";

function SignUpPage() {
  return (
    <div className="h-full grid grid-cols-5">
      <div className="col-span-2 flex justify-center items-center">
        <Card className="w-full max-w-md p-4 bg-white text-color2">
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
      <div className="col-span-3 flex items-center">
        <Image
          src="/image3.jpg"
          alt="image"
          width={800}
          height={600}
          quality={100}
          className="bg-cover rounded-xl"
        />
      </div>
    </div>
  );
}

export default SignUpPage;
