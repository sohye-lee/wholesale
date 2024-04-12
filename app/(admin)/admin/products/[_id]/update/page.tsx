"use client";
import { uploadImage } from "@/app/lib/uploadImage";
import Container from "@components/UI/container/container";
import ProductCreateForm from "@components/forms/adminForms/productCreateForm";
import {
  NewProductData,
  ProductEditInitialValues,
  ProductInitialValues,
} from "@lib/types";
import React, { useEffect } from "react";
import useRequest from "@/app/hooks/useRequest";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import swrFetcher from "@lib/swrFetcher";
import ProductEditForm from "@/app/components/forms/adminForms/productEditForm";

interface Image {
  id: string;
  url: string;
}

export default function ProductUpdatePage() {
  const router = useRouter();
  const path = usePathname();
  const productId = path.split("/")[3];
  const { data: productData, error: productError } = useSWR(
    `/api/products/${productId}`,
    swrFetcher
  );

  const [updateProduct, { data, error, loading }] = useRequest(
    `/api/products`,
    "PUT"
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

      updateProduct({
        ...validForm,
        price: { base: validForm.base, discounted: validForm.discounted },
        thumbnail: thumbnailRes,
        images,
      });
    } catch (error) {
      console.log(error);
      toast.error((error as any).message);
    }
  };

  const initialValue: ProductEditInitialValues = {
    ...productData?.product,
    title: productData?.title ?? "",
    thumbnail: productData?.product?.thumbnail?.url,
    images: productData?.product?.images?.map(
      (i: { id: string; url: string }) => {
        return { url: i.url, id: i.id };
      }
    ),
    bulletpoints: productData?.product?.bulletpoints
      ? [...productData?.product?.bulletpoints]
      : [""],
  };
  useEffect(() => {
    data?.ok && data?.product && router.push(`/products/${data?.product?._id}`);
    console.log(productData);
  }, [data?.product, productData, router]);
  return (
    <Container width="small" addClass="pt-0">
      <ProductEditForm onSubmit={onSubmit} initialValue={initialValue} />
    </Container>
  );
}
