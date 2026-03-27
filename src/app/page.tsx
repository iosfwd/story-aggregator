import { prisma } from "@/lib/prisma";
import Stories from "@/components/stories";
import Link from "next/link";

export default async function Home({
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

  const totalPages = Math.ceil(storyCount / 30);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Stories stories={stories} />

      {totalPages > 1 && (
	<div className="relative mt-6 flex items-center justify-center gap-4 font-mono text-sm text-stone-500">
	  {currentPage > 1 && (
	    <Link
	      href={`/?page=${currentPage - 1}`}
	      className="absolute left-0 transition-colors hover:text-pink-500"
	    >
	      ← prev
	    </Link>
	  )}
	  <span>
	    page {currentPage} of {totalPages}
	  </span>

	  {currentPage < totalPages && (
	    <Link
	      href={`/?page=${currentPage + 1}`}
	      className="absolute right-0 transition-colors hover:text-pink-500"
	    >
	      next →
	    </Link>
	  )}
	</div>
      )}
    </div>
  );
}
