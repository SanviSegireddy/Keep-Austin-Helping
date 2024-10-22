"use server";

import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { SignUpSchema } from "@/lib/zod";
import { ResponseEntity } from "@/types";

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
  const validatedUser = SignUpSchema.safeParse(user);

  try {
    if (!validatedUser.success) {
      return {
        status: "error",
        message: validatedUser.error.errors[0].message,
      };
    }

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

    await db.user.update({
      where: {
        id,
      },
      data: validatedUser.data,
    });

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

export const deleteUserById = async (id: string): Promise<ResponseEntity> => {
  try {
    await db.user.delete({
      where: {
        id,
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
