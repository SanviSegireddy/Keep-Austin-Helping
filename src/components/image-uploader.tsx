"use client";

import { toast } from "sonner";

import { CldUploadButton } from "next-cloudinary";

import { Success } from "./ui/sonner";
import { Button } from "./ui/button";
import { revalidateCache } from "@/actions/testimonial";
import { useSession } from "next-auth/react";

export default function ImageUploader() {
  const { data: session } = useSession();
  const handleSuccess = async () => {
    const response = await revalidateCache();

    if (response.status === "success") {
      toast.success(response.message, {
        icon: <Success />,
      });
    }
  };

  if (!session?.user) return null;

  return (
    <Button
      className="flex h-0 items-center justify-center gap-1 p-0 text-xs text-blue-600"
      asChild
      variant={"link"}
    >
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={() => handleSuccess()}
      >
        <p className="text-center">Want to add yours? Click me</p>
      </CldUploadButton>
    </Button>
  );
}
