"use client";
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import React from "react";
import "./../../app/globals.css";
import Buttons from "@/components/hero/buttons";

export default function Hero({ user }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
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
        <Buttons user={user} />
      </motion.h1>
    </div>
  );
}
