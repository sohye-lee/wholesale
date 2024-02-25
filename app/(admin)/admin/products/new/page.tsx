'use client';
import Container from '@components/UI/container/container';
import ProductCreateForm from '@components/forms/adminForms/productCreateForm';
import { NewProductData, ProductForm } from '@lib/types';
import React from 'react';

export default function ProductCreatePage() {
  const onSubmit = (validForm: NewProductData) => {
    // e.preventDefault();
    console.log('e', validForm);
  };
  return (
    <Container width="small" addClass="pt-0">
      <ProductCreateForm onSubmit={onSubmit} />
    </Container>
  );
}
