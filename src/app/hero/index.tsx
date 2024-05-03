import Hero from "./form";
import "./../../app/globals.css";
import { auth } from "@/auth";

export default function HeroPage({ user }) {
  return (
      <Hero user={user} />
  )
}

export async function getServerSideProps() {
  const session = await auth();
  const user = session?.user;

  return {
    props: {
      user,
    },
  };
}