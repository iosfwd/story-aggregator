import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Comments from "@/components/comments";

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: true };
}>;

function buildCommentTree(comments: CommentWithAuthor[]) {
  const map = new Map();
  const topLevelComments = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  for (const comment of comments) {
    if (comment.parentId === null) {
      topLevelComments.push(map.get(comment.id));
    } else {
      map.get(comment.parentId)?.children.push(map.get(comment.id));
    }
  }

  return topLevelComments;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
      comments: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!story) {
    notFound();
  }

  const commentTree = buildCommentTree(story.comments);

  return (
    <div>
      <div>
        {story.title} {story.author.username}
      </div>
      <Comments comments={commentTree} />
    </div>
  );
}
