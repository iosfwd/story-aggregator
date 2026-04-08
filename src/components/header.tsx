import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export default async function Header() {
  const session = await verifySession().catch(() => null);

  const user = session
    ? await prisma.user.findUnique({
        where: { id: Number(session.userId) },
        select: { username: true },
      })
    : null;

  const username = user ? user.username : "";

  return (
    <header className="bg-pink-500 px-4 py-1">
      <nav className="mx-auto flex max-w-4xl items-center gap-2 text-sm">
        <div className="mr-auto flex items-center gap-2">
          <Link href="/">Home</Link>
          <span className="text-black/40"> | </span>
          <Link href="/submit">Submit</Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              <span>{`Logged in as ${username}`}</span>
              <span className="text-black/40"> | </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href={"/login"}>Login</Link>
              <span className="text-black/40"> | </span>
              <Link href={"/signup"}>Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
