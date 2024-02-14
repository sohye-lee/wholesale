import Container from '@/app/components/UI/container/page';
import SignInForm from '@/app/components/forms/signinForm';
import React from 'react';

export default function SignInPage() {
  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <SignInForm />
    </Container>
  );
}
