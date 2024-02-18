'use client';
import { useSession } from 'next-auth/react';

interface Auth {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
}
export default function useAuth(): Auth {
  const { data, status } = useSession();

  return {
    loading: status == 'loading',
    loggedIn: status == 'authenticated',
    isAdmin: data?.user?.role == 'admin',
  };
}
