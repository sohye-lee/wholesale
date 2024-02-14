import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthSessionoProps {
  children: React.ReactNode;
}
export default function AuthSession({ children }: AuthSessionoProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
