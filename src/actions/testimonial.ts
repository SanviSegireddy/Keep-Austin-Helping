"use server";

import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";

import { ResponseEntity } from "@/types";

export const deleteImage = async (
  publicId: string
): Promise<ResponseEntity> => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);

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
