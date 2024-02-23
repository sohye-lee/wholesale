"use client";
import Container from "@/app/components/UI/container/container";
import ProductCreateForm from "@/app/components/forms/adminForms/productCreateForm";
import React from "react";

export default function ProductCreatePage() {
  const onSubmit = () => {};
  return (
    <Container width="small" addClass="pt-0">
      <ProductCreateForm onSubmit={onSubmit} />
    </Container>
  );
}
