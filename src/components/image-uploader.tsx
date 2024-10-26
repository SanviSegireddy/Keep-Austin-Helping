"use client";

import { toast } from "sonner";
import { Upload } from "lucide-react";

import { CldUploadButton } from "next-cloudinary";

import { Success } from "./ui/sonner";
import { Button } from "./ui/button";

export default function ImageUploader() {
  return (
    <Button className="flex items-center gap-1" asChild variant={"outline"}>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={() => {
          toast.success("Image uploaded successfully", {
            icon: <Success />,
          });
        }}
      >
        <Upload />
        <span>Upload image</span>
      </CldUploadButton>
    </Button>
  );
}
