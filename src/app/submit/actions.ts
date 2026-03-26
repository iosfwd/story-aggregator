"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifySession } from "@/lib/session";

const storySchema = z.object({
  title: z.string().min(1, "Title required").max(100, "Title too long"),
  url: z.url("Invalid URL"),
});

export type StoryFormState = {
  errors?: {
    title?: string[];
    url?: string[];
  };
} | null;

export async function createStory(
  _prevState: StoryFormState,
  formData: FormData,
) {
  const session = await verifySession();

  const result = storySchema.safeParse({
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const story = await prisma.story.create({
    data: { ...result.data, authorId: Number(session.userId) },
  });

  revalidatePath("/");
  redirect(`/story/${story.id}`);
}
