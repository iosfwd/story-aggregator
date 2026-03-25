"use client";

import { Prisma } from "@/app/generated/prisma/client";
import CommentForm from "@/components/comment-form";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: { author: true };
}>;

type CommentItem = CommentWithAuthor & {
  children: CommentItem[];
};

type Props = {
  comment: CommentItem;
  depth: number;
};

const DEPTH_COLORS = [
  "border-orange-400",
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
    <div className={"mt-0 flex flex-row gap-2 pl-0"}>
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
            {comment.author.username} {timeAgo(comment.createdAt)} ago
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-1 cursor-pointer text-stone-400 transition-colors hover:text-stone-600"
          >
            {collapsed ? "[+]" : "[–]"}
          </button>
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
