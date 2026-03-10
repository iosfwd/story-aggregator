import Story from "@/components/story";

export default function Stories({ stories }) {
  return (
    <div>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
}
