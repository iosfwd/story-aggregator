import LoginForm from "@/components/login-form";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await verifySession().catch(() => null);

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
