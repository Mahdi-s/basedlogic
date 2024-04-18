import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "../pages/logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opinion Collector by BasedLogic",
  description: "Formulate, Collect, Enhance",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>

          {/* <nav>
            {!!session &&
              <Logout/>
            }

            {!session &&
              <Link href="loginpage">Login</Link>
            }
          </nav> */}
          {children}
          
      </body>
    </html>
  );
}
