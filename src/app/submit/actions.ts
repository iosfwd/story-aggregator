"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const storySchema = z.object({
  title: z.string().min(1).max(100),
  url: z.url(),
});

export async function createStory(formData: FormData) {
  const data = storySchema.parse({
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
  });

  await prisma.story.create({
    data: { ...data, authorId: 9 },
  });

  revalidatePath("/");
  redirect("/");
}
