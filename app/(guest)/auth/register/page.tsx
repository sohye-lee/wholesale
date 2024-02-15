import Container from '@/app/components/UI/container/page';
import SignUpForm from '@/app/components/forms/signupForm';
import React from 'react';

export default function SignUpPage() {
  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <SignUpForm />
    </Container>
  );
}