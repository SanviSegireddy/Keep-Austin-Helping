/* eslint-disable */
"use client";

import { CloudUpload, Upload } from "lucide-react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { upload } from "@/actions/testimonial";
import { toast } from "sonner";
import { Error, Success } from "./ui/sonner";

export default function UploadImage() {
  const uploadImageToDb = async (url: string) => {
    const response = await upload(url);

    if (response.status === "error") {
      toast.error(response.message, {
        icon: <Error />,
      });
      return;
    }

    if (response.status === "success") {
      toast.success(response.message, {
        icon: <Success />,
      });
    }
  };

  return (
    <CldUploadButton
      signatureEndpoint="/api/upload-image"
      onSuccess={(event) => {
        //@ts-expect-error error expected
        uploadImageToDb(event.info?.public_id);
      }}
    >
      {/* {({ open }) => {
        return (
          <Button variant={"outline"} className="p-2" onClick={() => open()}>
            <CloudUpload />
          </Button>
        );
      }} */}
      Upload
    </CldUploadButton>
  );
}
