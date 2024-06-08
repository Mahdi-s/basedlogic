import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import AuthProvider from "@/components/AuthProviders";
import SessionProvider from "./SessionProvider";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import NavBar from "@/components/ui/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opinion Collector by BasedLogic",
  description: "Formulate, Collect, Enhance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <HeroHighlight>
            <NavBar/>
            {children}
          </HeroHighlight>
        </SessionProvider>
      </body>
    </html>
  );
}
