import Form from "next/form";
import { createStory } from "@/app/submit/actions";

export default function SubmitForm() {
  return (
    <div className="mx-auto max-w-sm">
      <Form action={createStory} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="url"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 font-mono text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="cursor-pointer rounded bg-pink-500 px-4 py-2 font-mono text-sm text-white transition-colors hover:bg-pink-600 active:bg-pink-700"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
