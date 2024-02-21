import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Container from "@components/UI/container/container";
import EmailVerificationAlert from "@components/UI/emailVerificationAlert";
import Navbar from "../components/UI/navbar/navbar";
import Footer from "../components/UI/footer/footer";

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default async function GuestLayout({ children }: GuestLayoutProps) {
  const session = await auth();
  if (session?.user) return redirect("/");
  return (
    <>
      <Navbar cartItemsCount={0} />
      {children}
      <Footer />
    </>
  );
}
