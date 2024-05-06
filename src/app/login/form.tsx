"use client";
import React, { FormEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/../../utils/cn";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import "./../../app/globals.css";
import { motion } from "framer-motion";
import { IconBrandGoogle } from "@tabler/icons-react";
import { loginUser } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    useEffect(() => {
      console.log("In Use effect");
      e.preventDefault();
      loginUser(e);
      console.log("Form submitted");
    }, []);
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => { 
      router.push('/signup');
  };

  const handleGoogleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    useEffect(() => {
      console.log("In Use effect");
      e.preventDefault();
      //TODO: Implement GOogle Singup function
      console.log("Form submitted");
    }, []);
  };


  return (
    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-transparent">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome back to Based Logic
          </h2>
          <form className="my-8" onSubmit={handleLogin}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="john.doe@gmail.com"
                type="email"
                name="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
              />
            </LabelInputContainer>

            <div className="flex flex-col justify-center items-center space-y-3">

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Log In &rarr;
                <BottomGradient />
              </button>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="button"
                onClick={handleGoogleSignup}
              >
                <div className="flex justify-center items-center space-x-2">
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                </div>
                <BottomGradient />
              </button>

              <button
                className="bg-transparent relative group/btn block w-1/2 text-white  h-10 font-medium"
                type="button"
                onClick={handleSignup}
              >
                Sign Up
                <BottomGradient />
              </button>

            </div>
          </form>
        </div>
      </motion.div>
    </HeroHighlight>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
