"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavButton() {
  const { data: session } = useSession();
  const user = session?.user;
  console.log("user", user);
  return (
    <button className="w-20 h-10 rounded-xl bg-white text-black border border-black  text-sm">
      {user ? user.name : <Link href="/login">Login</Link>}
    </button>
  );
}
