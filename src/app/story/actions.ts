"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const commentSchema = z.object({
  storyId: z.number(),
  parentId: z.number().nullable(),
  content: z.string().min(1).max(5000),
});

export async function createComment(formData: FormData) {
  const data = commentSchema.parse({
    storyId: Number(formData.get("storyId")),
    parentId: formData.get("parentId")
      ? Number(formData.get("parentId"))
      : null,
    content: String(formData.get("content") ?? ""),
  });

  await prisma.comment.create({
    data: { ...data, authorId: 9 },
  });

  revalidatePath(`/story/${data.storyId}`);
}
