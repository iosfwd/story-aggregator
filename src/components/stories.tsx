import Story from "@/components/story";
import { StoryWithMeta } from "@/lib/types";

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
