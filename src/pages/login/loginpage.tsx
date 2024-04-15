import { getServerSession } from "next-auth";
import Login from "./login";
import { redirect } from "next/navigation";
import "./../../app/globals.css";


export default  function Loginpage() {
  // const session = await getServerSession();
  // if (session){
  //   redirect('/');
  // }
  return (
    <Login />
  )
}