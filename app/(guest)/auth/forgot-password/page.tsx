import Container from "@/app/components/UI/container/page";
import ForgotPasswordForm from "@/app/components/forms/forgotPasswordForm";
import React from "react";

export default function SignInPage() {
  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <ForgotPasswordForm />
    </Container>
  );
}
