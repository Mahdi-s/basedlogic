"use server";
import { signIn } from "@/auth";
import { FormEvent } from "react";

export async function credentialLogin(event: FormEvent) {
    console.log("In Login");

    event.preventDefault();
    const target = event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("Login response");
    console.log({ response });
    if (!response?.error) {
      console.log(`Username: ${response.user.username}`); // Log the username
      return true;
    }
    console.error("Login failed");
    return false;
}