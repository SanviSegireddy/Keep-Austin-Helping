"use client";

import { Loader2, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteImage } from "@/actions/testimonial";
import { Button } from "@/components/ui/button";
import { Error, Success } from "@/components/ui/sonner";
import { CloudinaryImage } from "@/types";
import { CldImage } from "next-cloudinary";

interface MediaViewerProps {
  image: CloudinaryImage;
  public_key: string | string[];
}

const MediaViewer = ({ image, public_key }: MediaViewerProps) => {
  const [isDeletionPending, startDeletionTransition] = useTransition();

  const handleDelete = (publicId: string) => {
    startDeletionTransition(async () => {
      if (isDeletionPending) return;

      const response = await deleteImage(publicId);

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
    });
  };

  return (
    <div className="group relative">
      {public_key.includes(process.env.NEXT_PUBLIC_ADMIN_KEY as string) && (
        <Button
          className="invisible absolute right-2 top-2 h-6 p-1 group-hover:visible"
          variant={"secondary"}
          onClick={() => handleDelete(image.public_id)}
        >
          {isDeletionPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      )}
      <CldImage
        src={image.url}
        alt="image"
        width={300}
        height={200}
        className="aspect-[4/3] w-80 rounded-lg object-cover"
        loading="lazy"
        loader={() => image.url}
      />
    </div>
  );
};

export default MediaViewer;
