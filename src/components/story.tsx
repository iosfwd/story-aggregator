import Link from "next/link";
import VoteButtons from "@/components/vote-buttons";
import { StoryWithMeta } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

type Props = {
  story: StoryWithMeta;
};

export default function Story({ story }: Props) {
  return (
    <div className="group flex items-center gap-3 rounded px-1 py-2 hover:bg-stone-100">
      <VoteButtons storyId={story.id} score={story.score} />

      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
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
          <span className="mx-0.5 text-stone-400">|</span>
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
