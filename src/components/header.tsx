import Link from "next/link";
import { verifySession } from "@/lib/session";
import logoutButton from "@/components/logout-button";

export default async function Header() {
  const session = await verifySession().catch(() => null);

  return (
    <header className="bg-pink-500 px-4 py-1">
      <nav className="max-w-4xl mx-auto flex items-center gap-2 text-sm">
	<Link href="/">Home</Link>
	<span className="text-black/40"> | </span>
	<Link href="/submit">Submit</Link>
	{!session && <span className="text-black/40"> | </span>}
	{!session && <Link href={"/login"}>Login</Link>}
	{!session && <span className="text-black/40"> | </span>}
	{!session && <Link href={"/signup"}>Sign up</Link>}
	<span className="text-black/40"> | </span>
	{session && <button onClick={logoutButton}>Logout</button>}
      </nav>
    </header>
  );
}
