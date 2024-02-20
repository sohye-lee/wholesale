import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import Container from '@components/UI/container/container';
import EmailVerificationAlert from '@components/UI/emailVerificationAlert';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth();
  if (!session?.user) return redirect('/auth/login');
  return (
    <Container width="small" addClass="pt-5">
      {!session?.user.verified && <EmailVerificationAlert />}
      {children}
    </Container>
  );
}
