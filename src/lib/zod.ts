import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter your email address" })
      .email({ message: "Please enter a valid email address" }),
    fistName: z.string().min(1, { message: "Please enter your fist name" }),
    lastName: z.string().min(1, { message: "Please enter your last name" }),
    password: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/])[A-Za-z\d ~`!@#$%^&*()_\-+={[}\]\|\\:;"'<,>.?/]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Please re enter your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const UpdateUserSchema = z.object({
  fistName: z.string().min(1, { message: "Please enter your fist name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
});
