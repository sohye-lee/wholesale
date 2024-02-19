import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/UI/navbar/navbar";
import Footer from "@/app/components/UI/footer/footer";
import { SessionProvider } from "next-auth/react";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={work_sans.className}>
          <Navbar cartItemsCount={0} />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
