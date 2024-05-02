import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { sql } from "@vercel/postgres";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  //adapter: PrismaAdapter(prisma) as Adapter,
  // callbacks: {
  //   session({ session, user }) {
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials');
        }

        if (typeof credentials.email !== 'string') {
          throw new Error('Email is required');
        }

        if (typeof credentials.password !== 'string') {
          throw new Error('Email is required');
        }

        const response = await sql`
          SELECT * FROM users WHERE email = ${credentials.email}
        `;

        const user = response.rows[0];
        if (!user) {
          throw new Error('No user found with the email');
        }

        const passwordCorrect = await compare(credentials.password, user.password);
        if (!passwordCorrect) {
          throw new Error('Incorrect password');
        }

        return { id: user.id, email: user.email };
      }
    }),
    //Google
  ],
  
});