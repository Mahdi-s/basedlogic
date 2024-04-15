
import SignupForm from "./signupform";
import React from 'react';
import "./../../app/globals.css";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default function Registerpage() {
  // const session = await getServerSession();
  // if (session){
  //   redirect('/');
  // }
  return (
    <SignupForm />
  )
}

