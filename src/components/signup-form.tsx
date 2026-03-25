import Form from "next/form";
import { createUser } from "@/app/signup/actions";

export default function SignupForm() {
  return (
    <Form action={createUser}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" placeholder="Password" required />
      </div>
      <button type="submit">Sign up</button>
    </Form>
  );
}
