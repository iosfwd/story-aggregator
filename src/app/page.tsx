import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";
import PaginationNavigation from "@/components/pagination-navigation";

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
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const storyCount = await prisma.story.count();

  const pageCount = Math.ceil(storyCount / 30);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Stories stories={stories} />

      <PaginationNavigation currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
