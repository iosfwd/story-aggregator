import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
      comments: { include: { author: true } },
    },
  });

  if (!story) {
    notFound();
  }

  return (
    <div>
      <div>
	{story.title} {story.author.username}
      </div>
      <div>
	{story.comments.map((comment) => (
	  <div key={comment.id}>
	    <div>{comment.author.username}</div>
	    <div>{comment.content}</div>
	  </div>
	))}
      </div>
    </div>
  );
}
