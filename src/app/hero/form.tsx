"use client";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import React from "react";
import Link from "next/link";
import "./../../app/globals.css";
import { User } from "next-auth";

interface HeroProps {
  user: User;
}

export default function Hero({ user }: { user: HeroProps | undefined }) {
  const router = useRouter();

  const navigateToOpinionCollection = () => {
    router.push("/collectionPage");
  };

  return (
    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">
      <motion.h1
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
        className="text-2xl px-4  md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Swipe to discover which political issues matter most to you,{" "}
        <Highlight className="text-black dark:text-white">
          contribute to democracy.
        </Highlight>
      </motion.h1>

      <motion.h1
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
        {user ? (
          <button
            onClick={navigateToOpinionCollection}
            className="p-[3px] relative mt-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 rounded-lg" />
            <div className="px-3 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-2xl">
              Welcome Back {user.user.id}!
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
                Try it, It&apos;s Free!
              </div>
            </button>

            <p className="text-center text-neutral-700 dark:text-white">
              Already a user?{" "}
              <Link href="/login" className="hover:underline">
                Log in
              </Link>
            </p>
          </>
        )}
      </motion.h1>
    </HeroHighlight>
  );
}
