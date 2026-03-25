"use client";

import { upsertVote } from "@/app/story/actions";

type Props = {
  storyId: number;
  score: number;
};

export default function VoteButtons({ storyId, score }: Props) {
  return (
    <div className="flex shrink-0 flex-row items-center gap-1">
      <span className="w-6 text-right font-mono text-sm font-semibold text-stone-600 tabular-nums">
        {score}
      </span>

      <div className="flex w-8 shrink-0 flex-col items-center gap-0.5">
        <button
          className="cursor-pointer leading-none transition-colors hover:text-orange-500"
          onClick={() => upsertVote(storyId, 1)}
        >
          ▲
        </button>
        <button
          className="cursor-pointer leading-none transition-colors hover:text-blue-500"
          onClick={() => upsertVote(storyId, -1)}
        >
          ▼
        </button>
      </div>
    </div>
  );
}
