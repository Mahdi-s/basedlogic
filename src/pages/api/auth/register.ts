import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {firstname, lastname, email, password} = req.body;
        //validate password
        //use zod to validate input
        //console.log("In Route")
        //console.log({firstname, lastname, email, password})

        const hashedPassword = await hash(password, 10);

        const response = await sql`
            INSERT INTO users (email, firstname, lastname,  password)
            VALUES (${email}, ${firstname}, ${lastname},  ${hashedPassword})
        `;

        return res.status(200).json({message: "success"});
    } catch(e) {
        console.log({e});
        return res.status(500).json({message: "An error occurred"});
    }
}