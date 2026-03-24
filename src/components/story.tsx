import { Prisma } from "@/app/generated/prisma/client";
import Link from "next/link";

type StoryWithMeta = Prisma.StoryGetPayload<{
  include: {
    author: true;
    _count: { select: { comments: true } };
  };
}>;

type Props = {
  story: StoryWithMeta;
};

export default function Story({ story }: Props) {
  return (
    <div className="group flex items-center gap-3 py-2 px-1 rounded hover:bg-stone-100">
      <div className="flex flex-col items-center shrink-0 w-8">
        {story.score}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
          {story.url && (
            <span className="text-xs text-stone-400 font-mono truncate]">
              ({new URL(story.url).hostname.replace("www.", "")})
            </span>
          )}
        </div>

        <div className="flex flex-row gap-1 text-xs text-stone-500 font-mono">
          <span>submitted by {story.author.username}</span>
          <span className="text-stone-400 mx-0.5">|</span>
          <div>
            <Link href={`/story/${story.id}`}>
              {story._count.comments}{" "}
              {story._count.comments === 1 ? "comment" : "comments"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
