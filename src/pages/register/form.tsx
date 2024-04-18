'use client';
import React, { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/../../utils/cn";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import "./../../app/globals.css";
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';



export default  function SignupForm(){


    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        if (password !== retypePassword) {
          alert('Passwords do not match!');
          return;
        }
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/auth/register',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        });

        if (!response.ok) {
          console.error(`Error: ${response.status}`);
          const errorData = await response.text();
          console.error(errorData);
          return;
        }

        router.push('/main');

        console.log("Sign up Click Detected");
        console.log({response});
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
          Welcome to Opinion Collector
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign up and begin inputing your opinion on various topics and earn money! 
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="John" type="text" name="firstname" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Doe" type="text" name="lastname" />
          </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="sample@server.com" type="email"  name="email"/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" name="password" onChange={e => setPassword(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="Retype Password">Retype Password</Label>
            <Input id="retypePassword" placeholder="••••••••" type="password" onChange={e => setRetypePassword(e.target.value)}/>
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#FFA50040_inset,0px_-1px_0px_0px_#FFA50040_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

        </form>
      </div>
      </motion.div>
  </HeroHighlight>
     )
     
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