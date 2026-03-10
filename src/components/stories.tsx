import { Prisma } from "@/app/generated/prisma/client";
import Story from "@/components/story";

type StoryWithMeta = Prisma.StoryGetPayload<{
  include: {
    author: true;
    _count: { select: { comments: true } };
  };
}>;

type Props = {
  stories: StoryWithMeta[];
};

export default function Stories({ stories }: Props) {
  return (
    <div>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
}
