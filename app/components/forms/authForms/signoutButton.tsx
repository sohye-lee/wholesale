"use client";
import React from "react";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  children: React.ReactNode;
  addClass?: string;
}
export default function SignOutButton({
  children,
  addClass,
}: SignOutButtonProps) {
  const onClick = async () => {
    await signOut();
  };
  return (
    <button className={`cursor-pointer ${addClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
