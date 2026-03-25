import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Comments from "@/components/comments";
import CommentForm from "@/components/comment-form";
import VoteButtons from "@/components/vote-buttons";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storyId = parseInt(id);
  const story = await prisma.story.findUnique({
    where: { id: storyId },
    include: {
      author: true,
      comments: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!story) {
    notFound();
  }

  return (
    <div>
      <div>
	{story.title} {story.author.username}
      </div>

      <VoteButtons storyId={storyId} />

      <CommentForm storyId={storyId} parentId={null} />

      <Comments comments={story.comments} />
    </div>
  );
}
