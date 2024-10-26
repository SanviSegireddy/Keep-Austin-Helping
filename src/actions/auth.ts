"use server";

import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { SignUpSchema, UpdateUserSchema } from "@/lib/zod";
import { ResponseEntity } from "@/types";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

export const createUser = async (user: unknown): Promise<ResponseEntity> => {
  const validatedUser = SignUpSchema.safeParse(user);

  try {
    if (!validatedUser.success) {
      return {
        status: "error",
        message: validatedUser.error.errors[0].message,
      };
    }

    const { email, fistName, lastName, password, confirmPassword } =
      validatedUser.data;

    if (password !== confirmPassword) {
      return {
        status: "error",
        message: "Password do not match",
      };
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        status: "info",
        message: "User already exists",
      };
    }

    await db.user.create({
      data: {
        email,
        fistName,
        lastName,
        password: await bcryptjs.hash(password, 10),
      },
    });

    return {
      status: "success",
      message: "User created",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: "Unable to register user",
      };
    }
  }

  return {
    status: "error",
    message: "Something went wrong",
  };
};

export const updateUserById = async (
  id: string,
  user: unknown
): Promise<ResponseEntity> => {
  const validatedUser = UpdateUserSchema.safeParse(user);

  try {
    if (!validatedUser.success) {
      return {
        status: "error",
        message: validatedUser.error.errors[0].message,
      };
    }

    console.log("user", validatedUser.data);

    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return {
        status: "info",
        message: "User not found",
      };
    }

    const data = await db.user.update({
      where: {
        id,
      },
      data: validatedUser.data,
    });
    console.log(data);

    const user = await getServerSession(authOptions).then((res) => res?.user);
    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }
    user.name = data.fistName + " " + data.lastName;

    revalidatePath("/users");

    return {
      status: "success",
      message: "User updated",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};

export const deleteUser = async (): Promise<ResponseEntity> => {
  const user = await getServerSession(authOptions).then((res) => res?.user);

  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  try {
    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    return {
      status: "success",
      message: "User deleted",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
