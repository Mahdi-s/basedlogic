import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/pages/api/auth/[...nextauth]";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-transparent text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>Based Logic</div>
        <div className="flex gap-10">
          {session ? (
            <>
            <Link href="/main">Questionar</Link>
            <Link href="/dashboard">Dashboard</Link> 
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </>
          ) : (
            <>
            <Link href="/login">Login</Link>
            <Link href="/register">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;