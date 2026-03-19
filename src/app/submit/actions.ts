"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifySession } from "@/lib/session";

const storySchema = z.object({
  title: z.string().min(1).max(100),
  url: z.url(),
});

export async function createStory(formData: FormData) {
  const session = await verifySession();

  const data = storySchema.parse({
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
  });

  await prisma.story.create({
    data: { ...data, authorId: Number(session.userId) },
  });

  revalidatePath("/");
  redirect("/");
}
