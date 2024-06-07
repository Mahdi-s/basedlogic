import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { authConfig } from "./auth.config";
import { hash } from "bcryptjs";
import { parse } from "path";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";


const POCKET_BASE_URL = "http://127.0.0.1:8090";
const db = new PocketBase(POCKET_BASE_URL);

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      console.log("session callback", { session, token });
      session.user = {
        ...session.user,
        name: token.username as string,
        email: token.email as string,
        username: token.username as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      console.log("jwt callback", { token, user });
      if (user) {
        token.email = user.email as string;
        token.name = user.username as string;
      }
      return token;
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
          const { email, password } = credentials;
          const parsedCredentials = await signInSchema.parseAsync({
            email,
            password,
          });

          //const hashedPassword = await hash(password, 10);
          db.authStore.clear();
          const result = await db
            .collection("users")
            .authWithPassword(parsedCredentials.email, parsedCredentials.password);

          const user = {
            id: result.record.id,
            email: result.record.email,
            username: result.record.username,
          };

          cookies().set("token", db.authStore.token ?? "", {
            secure: true,
          });
          cookies().set("user", JSON.stringify(db.authStore.model), {
            secure: true,
          });
          console.log("Cookies set:", cookies().get("token"), " ^^^^^ ",cookies().get("user"));

          console.log("*****user*****", user);
          console.log("*****");
          

          return user;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
    Google,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export default auth;
