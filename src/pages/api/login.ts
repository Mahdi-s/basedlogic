import { NextResponse } from "next/server";
import db from "@/../utils/db";
import { cookies } from "next/headers";

export default async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    // validate email and password
    console.log("registering user");
    console.log({ username, email, password });

    //const hashedPassword = await hash(password, 10);

    const result = await db.authenticate(email, password);
    console.log("result");
    console.log({ result });

    const { record, token } = result;
    record.token = token;
    cookies().set("pb_auth", db.client.authStore.exportToCookie());
    return NextResponse.json(record);
  } catch (err: any) {
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