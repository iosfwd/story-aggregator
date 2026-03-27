"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/session";

const commentSchema = z.object({
  storyId: z.number(),
  parentId: z.number().nullable(),
  content: z.string().min(1, "Comment is empty").max(5000, "Comment too long"),
});

export type CommentFormState = {
  errors?: {
    content?: string[];
  };
} | null;

export async function createComment(
  _prevState: CommentFormState,
  formData: FormData,
) {
  const session = await verifySession();

  const result = commentSchema.safeParse({
    storyId: Number(formData.get("storyId")),
    parentId: formData.get("parentId")
      ? Number(formData.get("parentId"))
      : null,
    content: String(formData.get("content") ?? ""),
  });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  await prisma.comment.create({
    data: { ...result.data, authorId: Number(session.userId) },
  });

  revalidatePath(`/story/${result.data.storyId}`);
  return null;
}

export async function upsertVote(storyId: number, value: 1 | -1) {
  const session = await verifySession();
  const userId = Number(session.userId);

  await prisma.$transaction(async (tx) => {
    const vote = await tx.vote.findUnique({
      where: { userId_storyId: { userId, storyId } },
    });

    if (vote?.value === value) {
      await tx.vote.delete({
	where: { userId_storyId: { userId, storyId } },
      });
    } else {
      await tx.vote.upsert({
	where: { userId_storyId: { userId, storyId } },
	create: { userId, storyId, value },
	update: { value },
      });
    }

    const { _sum } = await tx.vote.aggregate({
      where: { storyId },
      _sum: { value: true },
    });

    await tx.story.update({
      where: { id: storyId },
      data: { score: _sum.value ?? 0 },
    });
  });

  revalidatePath("/");
  revalidatePath(`/story/${storyId}`);
}
