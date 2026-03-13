import Form from "next/form";
import { createComment } from "@/app/story/actions";

export default function CommentForm({
  storyId,
  parentId,
}: {
  storyId: number;
  parentId: number | null;
}) {
  return (
    <Form action={createComment}>
      <input type="hidden" name="storyId" value={storyId} />
      <input type="hidden" name="parentId" value={parentId ?? ""} />
      <textarea name="content" required />

      <button type="submit">Submit</button>
    </Form>
  );
}
