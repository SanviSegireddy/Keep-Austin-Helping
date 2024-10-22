"use server";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/options";
import { ResponseEntity } from "@/types";
import { getServerSession } from "next-auth";

export const upload = async (url: string): Promise<ResponseEntity> => {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);

    if (!user) {
      return {
        status: "error",
        message: "user not found",
      };
    }

    await db.testimonial.create({
      data: {
        url,
        userId: user.id,
      },
    });

    return {
      status: "success",
      message: "image uploaded succesfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "failed to upload image",
    };
  }
};
