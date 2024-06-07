"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function NavButton() {
  // const session = useSession();
  // console.log("In Nav Btn session", session);
  // const user = session?.data?.user?.email;
  // console.log("In Nav Btn user", user);
  
  const [user, setUser] = useState<string | null | undefined>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setUser(session?.user?.email);
  }, [session]);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  
  return (
    <div>
      {user ?  (
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="w-20 h-10 rounded-xl bg-white text-black border border-black  text-sm"
          >
            Logout
          </button>
        </form>
      ) :
       (
          <form onSubmit={handleLogin}>
            <button
              type="submit"
              className="w-20 h-10 rounded-xl bg-white text-black border border-black  text-sm"
            >
              Login
            </button>
          </form>
      )}
    </div>
  );
}
