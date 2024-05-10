"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavButton() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFA000_0%,#FFA300_50%,#FFA107_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {user ? user.name : <Link href="/login">Login</Link>}
      </span>
    </button>
  );
}
