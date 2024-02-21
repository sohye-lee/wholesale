import React from "react";
import Container from "@components/UI/container/container";
import Navbar from "../components/UI/navbar/navbar";
import Footer from "../components/UI/footer/footer";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Navbar cartItemsCount={0} />
      {children}
      <Footer />
    </>
  );
}
