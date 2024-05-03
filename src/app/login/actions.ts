import { signIn } from "@/auth";
import { FormEvent } from "react";

export async function loginUser(event: FormEvent) {
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
      return true;
    }
    return false;
}