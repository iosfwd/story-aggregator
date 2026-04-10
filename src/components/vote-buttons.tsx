"use client";

import { upsertVote } from "@/app/story/[id]/actions";
import { useOptimistic, startTransition } from "react";

type Props = {
  storyId: number;
  score: number;
  initialVote: 1 | -1 | null;
};

type VoteState = {
  score: number;
  vote: 1 | -1 | null;
};

export default function VoteButtons({ storyId, score, initialVote }: Props) {
  const [optimistic, setOptimistic] = useOptimistic<VoteState, 1 | -1>(
    { score, vote: initialVote },
    (current, action) => {
      const isSameVote = current.vote === action;
      return {
        score: isSameVote
          ? current.score - action
          : current.score + action - (current.vote ?? 0),
        vote: isSameVote ? null : action,
      };
    },
  );

  async function handleVote(value: 1 | -1) {
    startTransition(async () => {
      setOptimistic(value);
      await upsertVote(storyId, value);
    });
  }

  return (
    <div className="flex shrink-0 flex-row items-center gap-1">
      <span className="w-6 text-right font-mono text-sm font-semibold text-stone-600 tabular-nums">
        {optimistic.score}
      </span>

      <div className="flex w-8 shrink-0 flex-col items-center gap-0.5">
        <button
          className="cursor-pointer leading-none transition-colors hover:text-orange-500"
          onClick={() => handleVote(1)}
        >
          ▲
        </button>
        <button
          className="cursor-pointer leading-none transition-colors hover:text-blue-500"
          onClick={() => handleVote(-1)}
        >
          ▼
        </button>
      </div>
    </div>
  );
}
