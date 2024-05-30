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


export default async function CreateUser(credentials){

  console.log(credentials);
  const response = await fetch('/api/register',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    const errorData = await response.text();
    console.error(errorData);
    throw new Error(`Error: ${response.status} - ${errorData}`);
  }
  return response;
}