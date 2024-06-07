import  HeroPage  from "./hero";
import { useSession } from "next-auth/react"
import { auth } from "../auth"


export async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <HeroPage user={user} />
  );
}

export default Home;