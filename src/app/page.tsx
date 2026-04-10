import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";
import PaginationNavigation from "@/components/pagination-navigation";
import { verifySession } from "@/lib/session";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1"));
  const offset = (currentPage - 1) * 30;

  const stories = await prisma.story.findMany({
    orderBy: [{ score: "desc" }, { createdAt: "desc" }],
    take: 30,
    skip: offset,
    include: {
      author: { select: { username: true } },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const { userId } = (await verifySession().catch(() => null)) ?? {
    userId: null,
  };

  const storyIds = stories.map((s) => s.id);
  const votes = userId
    ? await prisma.vote.findMany({
        where: {
          storyId: { in: storyIds },
          userId: Number(userId),
        },
        select: {
          storyId: true,
          value: true,
        },
      })
    : [];

  const voteMap = new Map<number, 1 | -1 | null>(
    votes.map((v) => [v.storyId, v.value as 1 | -1 | null]),
  );

  const storyCount = await prisma.story.count();

  const pageCount = Math.ceil(storyCount / 30);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Stories stories={stories} voteMap={voteMap} />

      <PaginationNavigation currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
