export default function Story({ story }) {
  return (
    <div>
      {story.title} {story.score} {story.author.username}{" "}
      {story._count.comments}
    </div>
  );
}
