import React from "react";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {
  children: React.ReactNode;
}
export default function SignOutButton({ children }: SignOutButtonProps) {
  const onClick = async () => {
    await signOut();
  };
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
