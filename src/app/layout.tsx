import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProviders";


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
    <html>
        <AuthProvider>
            <body className={inter.className}>
                {children}
            </body>
        </AuthProvider> 
    </html>
  );
}
