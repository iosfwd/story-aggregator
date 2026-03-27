"use client";
import { createComment, CommentFormState } from "@/app/story/actions";
import { useActionState } from "react";

type Props = {
  storyId: number;
  parentId: number | null;
};

export default function CommentForm({ storyId, parentId }: Props) {
  const [state, action, pending] = useActionState<CommentFormState, FormData>(
    createComment,
    null,
  );

  const isReply = parentId !== null;

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="storyId" value={storyId} />
      <input type="hidden" name="parentId" value={parentId ?? ""} />

      <textarea
        name="content"
        rows={isReply ? 3 : 5}
        placeholder={isReply ? "Write a reply..." : "Write a comment..."}
        className="w-full resize-none rounded border border-stone-200 bg-white px-3 py-2 font-mono text-sm leading-relaxed text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
      />

      {state?.errors?.content && (
        <p className="font-mono text-xs text-red-500">
          {state.errors.content[0]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer self-start rounded bg-pink-500 px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-pink-600 active:bg-pink-700"
      >
        {pending ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
