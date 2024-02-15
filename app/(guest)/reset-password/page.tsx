"use client";
import ResetPasswordForm from "@/app/components/forms/resetPasswordForm";
import Button from "@components/UI/button/page";
import Container from "@components/UI/container/page";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ResetPassword() {
  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <ResetPasswordForm />
    </Container>
  );
}
