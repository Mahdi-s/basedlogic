// types.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
  }
}


declare module 'express-session' {
  interface SessionData {
    user: { [key: string]: any }; // Use any or replace with a more specific type
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session?: Session & Partial<SessionData>;
  }
}
