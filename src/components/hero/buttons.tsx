import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "next-auth";

interface HeroProps {
    user: User;
  }

export default function Buttons({ user }) {
  const router = useRouter();

  const navigateToOpinionCollection = () => {
    router.push("/collectionPage");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 1.0,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className="flex flex-col justify-center items-center space-y-2"
    >
      {user && user.name ? (
        <button
          onClick={navigateToOpinionCollection}
          className="p-[3px] relative mt-5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 rounded-lg" />
          <div className="px-3 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-2xl">
            Welcome Back {user.name}!
          </div>
        </button>
      ) : (
        <>
          <button
            onClick={navigateToOpinionCollection}
            className="p-[3px] relative mt-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 rounded-lg" />
            <div className="px-3 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-2xl">
              Try it, It's Free!
            </div>
          </button>

          <p className="text-sm text-center text-neutral-700 dark:text-white">
            Enhance your experience!{" "}
            <Link href="/signup" className="hover:underline">
              Sign Up
            </Link>
          </p>
        </>
      )}
    </motion.div>
  );
}
