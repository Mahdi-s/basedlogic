import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import db from "@/../utils/db";
import { authConfig } from './auth.config';
import { hash } from "bcryptjs";



export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    session({ session }) {
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
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
            throw new Error("Password is required"); 
          }



          // const { email, password } = await signInSchema.parseAsync(
          //   credentials
          // );
          const hashedPassword = await hash(credentials.password, 10);



          const result = await db.authenticate(credentials.email, hashedPassword);

          if (!result) {
            throw new Error("Error Recieving Information From Database");
          }
          console.log("result --- ");
          console.log(result);
          console.log("---------- ");

          const user = {
            id: result.record.id,
            username: result.record.username,
          };

          return user;
        } catch (error) {

          console.error(error);

          if (error.message === "Error Recieving Information From Database") {
            // Handle authentication failure
            throw new Error("Invalid email or password");
          } else {
            // Rethrow other errors to be handled by NextAuth
            throw error;
          }
          
        }
      },
    }),
    Google,
  ],
});
