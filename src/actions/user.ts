"use server";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/options";
import { ResponseEntity } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const updatePreferences = async (
  locations: string[],
  categories: string[]
): Promise<ResponseEntity> => {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);
    const location = locations.join("|");
    const category = categories.join("|");

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        preferredLocations: location,
        preferredCategories: category,
      },
    });
    revalidatePath("/users");

    return {
      status: "success",
      message: "preferences updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "failed to update preferences",
    };
  }
};
