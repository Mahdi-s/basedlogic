"use server";
import { signIn } from "@/auth";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import db from "@/../utils/db";

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
  try {
    const { username, email, password } = credentials;
    // validate email and password
    console.log("registering user");
    console.log({ username, email, password });

    const hashedPassword = await hash(password, 10);

    const record = await db.register(username, email, hashedPassword);
    console.log("record");
    console.log({ record });

  } catch (e) {
    console.log({ e });
    return { message: e };
  }

  return { message: "success" };
}