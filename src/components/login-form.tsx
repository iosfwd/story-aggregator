"use client";

import { loginUser, LoginFormState } from "@/app/login/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginFormState, FormData>(
    loginUser,
    null,
  );

  return (
    <div className="mx-auto max-w-sm">
      <form action={action} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
          />
          {state?.errors?.username && (
            <p className="font-mono text-xs text-red-500">
              {state.errors.username[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 transition-colors placeholder:text-stone-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 focus:outline-none"
          />
          {state?.errors?.password && (
            <p className="font-mono text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {state?.errors?.form && (
          <p className="font-mono text-xs text-red-500">
            {state.errors.form[0]}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded bg-pink-500 px-4 py-2 font-mono text-sm text-white transition-colors hover:bg-pink-600 active:bg-pink-700"
          >
            {pending ? "Logging in" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
