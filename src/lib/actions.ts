'use server';

import { signIn, signOut } from "../auth";
import PocketBase from "pocketbase";
import Cookies from 'js-cookie';

const POCKET_BASE_URL = "http://127.0.0.1:8090";
const db = new PocketBase(POCKET_BASE_URL);


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

export async function logout() {
  console.log("In logout");
  await signOut();
  db.authStore.clear();
  // Clear cookies
  Cookies.remove("token");
  Cookies.remove("user");
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
