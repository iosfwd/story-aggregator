"use client";

import Form from "next/form";
import { logoutUser } from "@/app/login/actions";

export default function LogoutButton() {
  return (
    <Form action={logoutUser} className="inline-block">
      <button type="submit" className="bg-none border-none cursor-pointer">Logout</button>
    </Form>
  );
}
