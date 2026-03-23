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
    <div>
      <div>
	<Link href={story.url}>{story.title}</Link>
      </div>
      <div>
	{story.score} {story.score === 1 ? "upvote" : "upvotes"}
      </div>
      submitted by {story.author.username}
      <div>
	<Link href={`/story/${story.id}`}>
	  {story._count.comments}{" "}
	  {story._count.comments === 1 ? "comment" : "comments"}
	</Link>
      </div>
    </div>
  );
}
