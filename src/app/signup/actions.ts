"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username too short")
    .max(24, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid username"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupFormState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
} | null;

export async function createUser(
  _prevState: SignupFormState,
  formData: FormData,
) {
  const result = signupSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { username, password } = result.data;

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return { errors: { username: ["Username taken"] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  redirect("/login");
}
