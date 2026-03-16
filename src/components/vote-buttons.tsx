"use client";

import { upsertVote } from "@/app/story/actions";

type Props = {
  storyId: number;
};

export default function VoteButtons({ storyId }: Props) {
  return (
    <div>
      <button onClick={() => upsertVote(storyId, 1)}>▲</button>
      <button onClick={() => upsertVote(storyId, -1)}>▼</button>
    </div>
  );
}
