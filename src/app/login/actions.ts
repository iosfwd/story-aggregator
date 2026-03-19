"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function loginUser(formData: FormData) {
  const data = loginSchema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  const { username, password } = data;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new Error("Password does not match");
  }

  createSession(String(user.id));

  redirect("/");
}
