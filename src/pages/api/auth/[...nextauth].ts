import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";


const options = {
  session:{
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log({credentials});

        if (!credentials || !credentials.password || !credentials.email) {
          throw new Error('Missing credentials');
        }

        const response = await sql`
        SELECT * FROM users WHERE email = ${credentials?.email}`;

        const user = response.rows[0];
        const passwordCorrect = await compare(credentials?.password, user.password);
        // console.log('passwordCorrect');
        // console.log({passwordCorrect});
        if(passwordCorrect){
          return{
            id: user.id,
            email: user.email,
          };
        }
        alert('Wrong Credentials!');
        return null;
      }
    })
  ]
};

export default NextAuth(options);

