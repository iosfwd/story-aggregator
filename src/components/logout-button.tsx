"use client";

import Form from "next/form";
import { logoutUser } from "@/app/login/actions";

export default function LogoutButton() {
  return (
    <Form action={logoutUser}>
      <button type="submit">Logout</button>
    </Form>
  );
}
