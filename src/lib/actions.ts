"use server";
import { signIn } from "../auth";
import { hash } from "bcryptjs";
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
    const user = await signIn("credentials", formData);
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
  return { message: "success" };
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
