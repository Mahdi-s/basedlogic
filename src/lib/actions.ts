// src/utils/actions.ts
"use server";
import { signIn } from "@/auth";

export async function handleSigninGoogle() {
    console.log("In handle signin google");
  signIn("google")
}



export async function handleLogin(formData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}


export async function CreateUser(credentials){

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