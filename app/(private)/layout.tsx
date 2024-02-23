import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Container from "@components/UI/container/container";
import EmailVerificationAlert from "@components/UI/emailVerificationAlert";
import Navbar from "@components/UI/navbar/navbar";
import Footer from "@components/UI/footer/footer";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");
  return (
    <div className="w-full pt-10 lg:pt-16">
      <Navbar cartItemsCount={0} />
      {!session?.user.verified && <EmailVerificationAlert />}
      {children}
      <Footer />
    </div>
  );
}
