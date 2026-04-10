import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Comments from "@/components/comments";
import CommentForm from "@/components/comment-form";
import VoteButtons from "@/components/vote-buttons";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { verifySession } from "@/lib/session";

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
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!story) {
    notFound();
  }

  const { userId } = (await verifySession().catch(() => null)) ?? {
    userId: null,
  };

  const existingVote = userId
    ? await prisma.vote.findUnique({
        where: { userId_storyId: { userId: Number(userId), storyId } },
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-start gap-3">
        <VoteButtons
          storyId={storyId}
          score={story.score}
          initialVote={(existingVote?.value ?? null) as 1 | -1 | null}
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-row items-baseline gap-1.5">
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            {story.url && (
              <span className="truncate font-mono text-xs text-stone-400">
                ({new URL(story.url).hostname.replace("www.", "")})
              </span>
            )}
          </div>

          <div className="flex flex-row gap-1 font-mono text-xs text-stone-500">
            <span>
              submitted by{" "}
              <Link href={`/user/${story.author.username}`}>
                {story.author.username}
              </Link>{" "}
              {timeAgo(story.createdAt)} ago
            </span>
          </div>
        </div>
      </div>

      <hr className="mb-6 border-stone-200" />

      <div className="mb-8">
        <CommentForm storyId={storyId} parentId={null} />
      </div>

      <Comments comments={story.comments} />
    </div>
  );
}
