import Form from "next/form";
import { loginUser } from "@/app/login/actions";

export default function LoginForm() {
  return (
    <Form action={loginUser}>
      <div>
	<label htmlFor="username">Username</label>
	<input id="username" name="username" placeholder="Username" required />
      </div>

      <div>
	<label htmlFor="password">Password</label>
	<input id="password" name="password" placeholder="Password" required />
      </div>

      <button type="submit">Login</button>
    </Form>
  );
}
