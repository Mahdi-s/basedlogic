import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";


const clientId = process.env.GOOGLE_ID;
const clientSecret = process.env.GOOGLE_SECRET;

if (!clientId || !clientSecret) {
    throw new Error('Missing Google ID or secret');
}

export const options = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                return token;
            }
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                return session;
            }
        }
    },
    providers: [
        GoogleProvider({
            clientId,
            clientSecret,
            async profile(profile) {
                console.log({profile})
                return {
                    id: profile.sub,
                    ...profile,
                }
            }
        }),
        CredentialsProvider({
          credentials: {
            email: { label: "Email", type: "text", placeholder: "you@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if (!credentials || !credentials.email || !credentials.password) {
              throw new Error('Missing credentials');
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
        })
      ]
}

export default (req, res) => {
  return NextAuth(req, res, options);
 };