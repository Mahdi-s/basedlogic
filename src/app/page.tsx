"use client";
import  HeroPage  from "./hero";


export function Home({ user }) {
  return (
    <HeroPage user={user} />
  );
}

export default Home;