import Form from "next/form";
import { createComment } from "@/app/story/actions";

type Props = {
  storyId: number;
  parentId: number | null;
};

export default function CommentForm({ storyId, parentId }: Props) {
  const isReply = parentId !== null;

  return (
    <Form action={createComment} className="flex flex-col gap-2">
      <input type="hidden" name="storyId" value={storyId} />
      <input type="hidden" name="parentId" value={parentId ?? ""} />

      <textarea
        name="content"
        required
        rows={isReply ? 3 : 5}
        placeholder={isReply ? "Write a reply..." : "Write a comment..."}
        className="w-full resize-none rounded border border-stone-200 bg-white px-3 py-2 font-mono text-sm leading-relaxed text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
      />

      <button
        type="submit"
        className="cursor-pointer self-start rounded bg-pink-500 px-3 py-1.5 font-mono text-xs text-white transition-colors hover:bg-pink-600 active:bg-pink-700"
      >
        Submit
      </button>
    </Form>
  );
}
