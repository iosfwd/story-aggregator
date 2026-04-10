import Story from "@/components/story";
import type { StoryWithMeta } from "@/lib/types";

type Props = {
  stories: StoryWithMeta[];
  voteMap: Map<number, 1 | -1 | null>;
};

export default function Stories({ stories, voteMap }: Props) {
  return (
    <div>
      {stories.map((story) => (
        <Story
          key={story.id}
          story={story}
          vote={voteMap?.get(story.id) || null}
        />
      ))}
    </div>
  );
}
