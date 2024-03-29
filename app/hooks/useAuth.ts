"use client";
import { useSession } from "next-auth/react";
import { SessionUserProfile } from "@lib/types";

interface Auth {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
  profile?: SessionUserProfile | null;
}
export default function useAuth(): Auth {
  const { data, status } = useSession();
  return {
    loading: status == "loading",
    loggedIn: status == "authenticated",
    isAdmin: data?.user?.role == "admin",
    profile: data?.user,
  };
}
