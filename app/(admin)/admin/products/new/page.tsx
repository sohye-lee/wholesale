'use client';
import { uploadImage } from '@/app/lib/uploadImage';
import Container from '@components/UI/container/container';
import ProductCreateForm from '@components/forms/adminForms/productCreateForm';
import { NewProductData, ProductForm } from '@lib/types';
import React from 'react';

export default function ProductCreatePage() {
  const onSubmit = async (validForm: NewProductData) => {
    try {
      validForm.thumbnail && (await uploadImage(validForm.thumbnail));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container width="small" addClass="pt-0">
      <ProductCreateForm onSubmit={onSubmit} />
    </Container>
  );
}
