import Form from "next/form";

export default function SignupForm() {
  return (
    <Form action={}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" placeholder="Password" />
      </div>
      <button type="submit">Sign Up</button>
    </Form>
  );
}
