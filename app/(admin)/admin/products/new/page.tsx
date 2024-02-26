"use client";
import { uploadImage } from "@/app/lib/uploadImage";
import Container from "@components/UI/container/container";
import ProductCreateForm from "@components/forms/adminForms/productCreateForm";
import { NewProductData, ProductForm } from "@lib/types";
import React from "react";
// import { createProduct } from "../actions";
import useRequest from "@/app/hooks/useRequest";

interface Image {
  id: string;
  url: string;
}
type FileImages = Image[];

export default function ProductCreatePage() {
  const [createProduct, { data, error, loading }] = useRequest(
    `/api/products`,
    "POST"
  );
  const onSubmit = async (validForm: NewProductData) => {
    try {
      let images: Image[] = [];
      const thumbnailRes =
        validForm.thumbnail && (await uploadImage(validForm.thumbnail));
      if (validForm.images) {
        const uploadImages = validForm.images.map(async (imageFile) => {
          const { id, url } = await uploadImage(imageFile);
          images.push({ id, url });
          return { id, url };
        });

        images = await Promise.all(uploadImages);
      }

      createProduct({
        ...validForm,
        price: { base: validForm.base, discounted: validForm.discounted },
        thumbnail: thumbnailRes,
        images: images,
      });
    } catch (error) {
      console.log(error);

      // toast.error(error.message)
    }
  };
  return (
    <Container width="small" addClass="pt-0">
      <ProductCreateForm onSubmit={onSubmit} />
    </Container>
  );
}
