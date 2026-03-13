"use client";

import { Prisma } from "@/app/generated/prisma/client";
import CommentForm from "@/components/comment-form";
import { useState } from "react";

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

export default function Comment({ comment, depth }: Props) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div>{comment.author.username}</div>
      <div>{comment.content}</div>

      <button onClick={() => setShowReply(!showReply)}>
        {showReply ? "close" : "reply"}
      </button>

      {showReply && (
        <CommentForm storyId={comment.storyId} parentId={comment.id} />
      )}

      {comment.children.map((child) => (
        <Comment key={child.id} comment={child} depth={depth + 1} />
      ))}
    </div>
  );
}
