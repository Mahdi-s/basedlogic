import db from "@/../utils/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    // validate email and password
    console.log("registering user");
    console.log({ username, email, password });

    const hashedPassword = await hash(password, 10);

    const record = await db.register(username, email, hashedPassword);
    console.log("record");
    console.log({ record });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}

export const config = {
  runtime: "edge",
};
