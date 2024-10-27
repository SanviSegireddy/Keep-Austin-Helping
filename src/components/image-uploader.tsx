"use client";

import { toast } from "sonner";
import { ImagePlus } from "lucide-react";

import { CldUploadButton } from "next-cloudinary";

import { Success } from "./ui/sonner";
import { Button } from "./ui/button";
import { revalidateCache } from "@/actions/testimonial";

export default function ImageUploader() {
  const handleSuccess = async () => {
    const response = await revalidateCache();

    if (response.status === "success") {
      toast.success(response.message, {
        icon: <Success />,
      });
    }
  };

  return (
    <Button className="flex items-center gap-1" asChild variant={"outline"}>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={() => handleSuccess()}
      >
        <ImagePlus />
        <span className="hidden md:block">Upload image</span>
      </CldUploadButton>
    </Button>
  );
}
