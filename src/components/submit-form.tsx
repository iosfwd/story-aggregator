import Form from "next/form";
import { createStory } from "@/app/submit/actions";

export default function SubmitForm() {
  return (
    <Form action={createStory}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required />
      </div>

      <div>
        <label htmlFor="url">URL</label>
        <input id="url" name="url" type="url" />
      </div>

      <button type="submit">Submit</button>
    </Form>
  );
}
