"use client";
import ResetPasswordForm from "@/app/components/forms/authForms/resetPasswordForm";
import Loading from "@/app/components/loading";
import Button from "@/app/components/UI/button/button";
import Container from "@/app/components/UI/container/container";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense fallback={<Loading />}>
      <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
        <ResetPasswordForm />
      </Container>
    </Suspense>
  );
}
