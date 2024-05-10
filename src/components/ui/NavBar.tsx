"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import NavButton from "./button";
// import UserButton from "./UserButton";
// import { Button } from "./ui/button";

export default function NavBar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    
   
    <header className="fixed top-0 left-0 w-full bg-transparent px-3 shadow-sm z-50">
      <nav className="flex h-14 items-center justify-between px-3">
        <Link href="/" className="font-bold">
          Based Logic
        </Link>
        <NavButton/>
      </nav>
    </header>
    

  );
}

// function SignInButton() {
//   return <Button onClick={() => signIn()}>Sign in</Button>;
// }