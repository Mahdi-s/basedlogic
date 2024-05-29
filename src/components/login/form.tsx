"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
//import { credentialLogin } from "./actions";
import React from "react";
import { cn } from "@/../utils/cn";
import { handleLogin, handleSigninGoogle } from "../../lib/actions";

import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  const googleSignIn = (event) => {
    handleSigninGoogle();
  };

  const submitSignup = (event) => {
    event.preventDefault();
    router.push("/signup");
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await handleLogin(formData);
  };
  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   router.push('/signup'); // replace '/signup' with your signup page route
  // };

  return (
    <form className="my-8" action={submitLogin}>
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
          onClick={googleSignIn}
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
          onClick={submitSignup}
        >
          Sign Up
          <BottomGradient />
        </button>
      </div>
    </form>
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
