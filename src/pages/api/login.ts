import { NextResponse } from "next/server";
import db from "@/../utils/db";
import { cookies } from "next/headers";

export default async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    console.log("registering user");
    console.log({ email, password });

    //const hashedPassword = await hash(password, 10);

    const result = await db.authenticate(email, password);
    // console.log("result");
    // console.log({ result });

    // const { record, token } = result;
    // record.token = token;
    // cookies().set("pb_auth", db.client.authStore.exportToCookie());
    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || err.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


export const config = {
    runtime: 'edge',
};