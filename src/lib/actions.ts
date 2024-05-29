// src/utils/actions.ts
"use server";
import { signIn } from "@/auth";

export async function handleSigninGoogle() {
    console.log("In handle signin google");
  signIn("google")
}



export async function handleLogin(formData) {
        console.log("1 In handle login");
        const email = formData.get("email");
        const password = formData.get("password");
        try {
          const response = await signIn("credentials", { email, password });
          console.log("In handle login");
          console.log(response);
        } catch (error) {
          console.error("Error during sign in:", error);
          // Handle error here, for example show a notification to the user
        }
}