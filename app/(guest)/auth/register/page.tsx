import Container from "@/app/components/UI/container/container";
import SignUpForm from "@/app/components/forms/authForms/signupForm";
import React from "react";

export default function SignUpPage() {
  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <SignUpForm />
    </Container>
  );
}
