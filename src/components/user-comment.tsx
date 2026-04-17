"use client";

import Link from "next/link";
import type { UserCommentItem } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import ExpandCollapseButton from "@/components/expand-collapse-button";
import ExpandCollapseBar from "@/components/expand-collapse-bar";

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
      <ExpandCollapseBar
        isCollapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
        accentColor={accentColor}
      />

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
            <ExpandCollapseButton
              isCollapsed={collapsed}
              onClick={() => setCollapsed(!collapsed)}
            />
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
