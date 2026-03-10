import { Prisma } from "@/app/generated/prisma/client";

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
      {story.title} {story.score} {story.author.username}{" "}
      {story._count.comments}
    </div>
  );
}
