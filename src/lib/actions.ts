'use server';

import { signIn } from "../auth";
import db from "@/../utils/db";

export async function handleSigninGoogle() {
  console.log("In handle signin google");
  signIn("google");
}

export async function handleLogin(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("In handle login");
    console.log("formData", formData);
    const user = await signIn("credentials", formData);
    return { message: "success" };
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function CreateUser(credentials) {
  try {
    const { username, email, password } = credentials;
    // TODO: validate email and password
    //const hashedPassword = await hash(password, 10);
    const record = await db.register(username, email, password);
  } catch (e) {
    console.log({ e });
    return { message: e };
  }
  return { message: "success" };
}
