"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";

const loginSchema = z.object({
  username: z.string().min(1, "Username required"),
  password: z.string().min(1, "Username required"),
});

export type LoginFormState = {
  errors?: {
    username?: string[];
    password?: string[];
    form?: string[];
  };
} | null;

export async function loginUser(
  _prevState: LoginFormState,
  formData: FormData,
) {
  const result = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { username, password } = result.data;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    return { errors: { form: ["Invalid username or password"] } };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return { errors: { form: ["Invalid username or password"] } };
  }

  await createSession(String(user.id));

  redirect("/");
}

export async function logoutUser() {
  await deleteSession();
  redirect("/");
}
