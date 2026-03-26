import Form from "next/form";
import { createUser } from "@/app/signup/actions";

export default function SignupForm() {
  return (
    <div className="mx-auto max-w-sm">
      <Form action={createUser} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="cursor-pointer rounded bg-pink-500 px-4 py-2 font-mono text-sm text-white transition-colors hover:bg-pink-600 active:bg-pink-700"
          >
            Sign up
          </button>
        </div>
      </Form>
    </div>
  );
}
