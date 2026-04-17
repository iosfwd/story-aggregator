"use client";

import CommentForm from "@/components/comment-form";
import Link from "next/link";
import type { CommentItem } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import ExpandCollapseButton from "@/components/expand-collapse-button";
import ExpandCollapseBar from "@/components/expand-collapse-bar";

type Props = {
  comment: CommentItem;
  depth: number;
};

const DEPTH_COLORS = [
  "border-pink-400",
  "border-blue-400",
  "border-emerald-400",
  "border-violet-400",
  "border-rose-400",
];

export default function Comment({ comment, depth }: Props) {
  const [showReply, setShowReply] = useState(false);
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
            {timeAgo(comment.createdAt)} ago
          </span>
          <ExpandCollapseButton
            isCollapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        {!collapsed && (
          <div>
            <p className="mb-1 text-sm leading-relaxed whitespace-pre-wrap text-stone-700">
              {comment.content}
            </p>

            <div className="mb-2 flex flex-col gap-3 font-mono text-xs text-stone-400">
              <button
                className="cursor-pointer self-start transition-colors hover:text-orange-500"
                onClick={() => setShowReply(!showReply)}
              >
                {showReply ? "close" : "reply"}
              </button>

              {showReply && (
                <div className="mb-3">
                  <CommentForm
                    storyId={comment.storyId}
                    parentId={comment.id}
                    onSuccess={() => setShowReply(false)}
                  />
                </div>
              )}
            </div>

            {comment.children.map((child) => (
              <Comment key={child.id} comment={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
