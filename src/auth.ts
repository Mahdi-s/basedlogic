import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from "next/server";


const pb = new PocketBase('http://127.0.0.1:8090');


export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // callbacks: {
  //   session({ session, user }) {
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      name:"Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials');
        }

        if (typeof credentials.email !== 'string') {
          throw new Error('Email is required');
        }

        if (typeof credentials.password !== 'string') {
          throw new Error('Email is required');
        }

        // const response = await sql`
        //   SELECT * FROM users WHERE email = ${credentials.email}
        // `;

        const authData = await pb.collection('users').authWithPassword(credentials.email, credentials.password);

        //const response = await pb.collection('users').getFirstListItem(`email=${credentials.email}`);


        
        if (!pb.authStore.isValid) {
          throw new Error('No user found with the email');
        }

        console.log(pb.authStore.model.id);
        pb.authStore.clear();

        return { id: pb.authStore.model.id, email: credentials.email };
      }
    }),
    Google
  ],
  
});