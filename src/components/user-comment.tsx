"use client";

import Link from "next/link";
import { UserCommentItem } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";

type Props = {
  comment: UserCommentItem;
  depth: number;
};

const DEPTH_COLORS = [
  "border-pink-400",
  "border-blue-400",
  "border-emerald-400",
  "border-violet-400",
  "border-rose-400",
];

export default function UserComment({ comment, depth }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const accentColor = DEPTH_COLORS[depth % DEPTH_COLORS.length];

  return (
    <div className="mt-0 flex flex-row gap-2 pl-0">
      <div className="flex w-4 shrink-0 flex-col items-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-px flex-1 border-l-2 ${accentColor} mt-1 cursor-pointer opacity-40 transition-opacity hover:opacity-100`}
          title={collapsed ? "Expand" : "Collapse"}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-mono text-xs text-stone-500">
          <span>
            <Link href={`/user/${comment.author.username}`}>
              {comment.author.username}
            </Link>{" "}
            {timeAgo(comment.createdAt)} ago on{" "}
            <Link href={`/story/${comment.storyId}`}>
              {comment.story.title}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-1 cursor-pointer text-stone-400 transition-colors hover:text-stone-600"
            >
              {collapsed ? "[+]" : "[–]"}
            </button>
          </span>
        </div>

        {!collapsed && (
          <div>
            <p className="mb-1 text-sm leading-relaxed whitespace-pre-wrap text-stone-700">
              {comment.content}
            </p>
            {comment.children.map((child) => (
              <UserComment key={child.id} comment={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
