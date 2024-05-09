'use client';

import React, { FormEvent } from "react";
import "./../../app/globals.css";
import Form from "@/components/login/form";

export default function LoginForm() {


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-transparent">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome back to Based Logic
      </h2>
      <Form />
    </div>
  );
}
