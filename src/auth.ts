import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import PocketBase from "pocketbase"; 
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod"

const pb = new PocketBase("http://127.0.0.1:8090");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
           if (!credentials || !credentials.email || !credentials.password) {
             throw new Error("Missing credentials");
           }
           if (typeof credentials.email !== "string") {
             throw new Error("Email is required");
           }
           if (typeof credentials.password !== "string") {
             throw new Error("Password is required"); // Corrected error message
           }
       
           const { email, password } = await signInSchema.parseAsync(credentials);
       
           const authData = await pb
             .collection("users")
             .authWithPassword(email, password);
       
           if (!pb.authStore.isValid) {
             throw new Error("No user found with the email");
           }
       
           if (pb.authStore.model) {
             console.log(pb.authStore.model.id);
             return {
               id: pb.authStore.model.id,
               email: email,
             };
           } else {
             return null; // Explicitly return null if no user model is found
           }
        } catch (error) {
           if (error instanceof ZodError) {
             return null;
           }
           throw error; // Rethrow other errors to be handled by NextAuth
        }
       },
    }),
    Google,
  ],
});
