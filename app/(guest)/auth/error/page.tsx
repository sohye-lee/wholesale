"use client";
import Button from "@/app/components/UI/button/button";
import Container from "@components/UI/container/container";
import { useRouter } from "next/navigation";
import React from "react";

// interface ErrorPageProps {
//   error: Error;
// }
export default function ErrorPage(props: any) {
  //   const errorMessage = error.message;
  console.log(props);
  const router = useRouter();

  return (
    <Container width="small" addClass="pt-8" bgColor="bg-stone-100">
      <div className="py-8 text-sm">Something went wrong.</div>
      <Button
        size="small"
        mode="neutral"
        button={false}
        link="/auth/login"
        addClass="mt-4"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </Container>
  );
}
