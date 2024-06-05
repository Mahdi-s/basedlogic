"use client";

import { useSession, signOut, signIn } from "next-auth/react";

export default function NavButton() {
  const session = useSession();
  const user = session.data?.user;

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  console.log("user", session);
  return (
    <div>
      {user && (
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="w-20 h-10 rounded-xl bg-white text-black border border-black  text-sm"
          >
            Logout
          </button>
        </form>
      )}
      {!user && (
        <>
          <form onSubmit={handleLogin}>
            <button
              type="submit"
              className="w-20 h-10 rounded-xl bg-white text-black border border-black  text-sm"
            >
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
}
