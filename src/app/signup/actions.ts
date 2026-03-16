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

export async function createUser(formData: FormData) {
  const data = signupSchema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  const { username, password } = data;

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  redirect("/");
}
