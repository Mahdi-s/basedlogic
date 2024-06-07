import type { NextAuthConfig, User } from 'next-auth';
import Google from 'next-auth/providers/google';
import credentials from 'next-auth/providers/credentials';


interface CustomUser extends User {
  id: string;
  email: string;
  username: string;
  emailVerified?: Date | null; // Added emailVerified to match AdapterUser type
}


export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session: async ({ session, token }) => {
      // Cast token.user to CustomUser type
      console.log("* IN AUTH CONFIG token", token);
      console.log('Session:', session);
      if (token.user) {
        const user = token.user as CustomUser;
        session.user = {
          ...user,
          emailVerified: user.emailVerified || null, // if emailVerified is undefined, use null instead
        };
      }
      return Promise.resolve(session);
    },
    authorized({ auth, request: { nextUrl } }) {
      console.log('auth.config.ts is loaded');
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/collectionPage');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;     
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/collectionPage', nextUrl));
      }
      return true;
    },
  },
  providers: [credentials, Google], 
} satisfies NextAuthConfig;