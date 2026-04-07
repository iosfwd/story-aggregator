import Link from "next/link";

type Props = {
  currentPage: number;
  pageCount: number;
}

export default function PaginationNavigation({ currentPage, pageCount }: Props) {
  return (
    <>
	{pageCount > 1 && (
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
	    page {currentPage} of {pageCount}
	  </span>

	  {currentPage < pageCount && (
	    <Link
	      href={`/?page=${currentPage + 1}`}
	      className="absolute right-0 transition-colors hover:text-pink-500"
	    >
	      next →
	    </Link>
	  )}
	</div>
	)}
    </>
  );
}
