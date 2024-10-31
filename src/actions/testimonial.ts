"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

import { ResponseEntity } from "@/types";

export const revalidateCache = async () => {
  revalidatePath("/");
  return {
    status: "success",
    message: "image uploaded successfully",
  };
};

export const deleteImage = async (
  publicId: string
): Promise<ResponseEntity> => {
  try {
    await cloudinary.uploader.destroy(publicId);

    revalidatePath("/");

    return {
      status: "success",
      message: "image deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Unable to delete image",
    };
  }
};
