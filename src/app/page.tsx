import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";

export default async function Home() {
  const stories = await prisma.story.findMany({
    orderBy: [{ score: "desc" }, { createdAt: "desc" }],
    take: 30,
    include: {
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return (
    <div>
      <Stories stories={stories} />
    </div>
  );
}
