"use client";
import Container from "@/app/components/UI/container/container";
import { capitalize, capitalizeWord } from "@/app/lib/functions";
import { ProductExtended, ProductImage } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const swrfetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage(props: any) {
  const { data } = useSWR(`/api/products/${props.params._id}`, swrfetcher);
  const [product, setProduct] = useState<ProductExtended>();
  const [images, setImages] = useState<ProductImage[]>([]);
  const [mainImage, setMainImage] = useState<ProductImage>();
  const [allImages, setAllImages] = useState<ProductImage[]>([]);

  const handleClick = (image: ProductImage) => {
    setMainImage(image);
  };

  const renderImages =
    images && images.length > 0 ? (
      images.map((image) => {
        return (
          <>
            <Image
              src={image.url!}
              key={image.id}
              alt={product?.title || ""}
              width="200"
              height="200"
            />
          </>
        );
      })
    ) : (
      <p>*No images</p>
    );

  const renderAllImages = allImages.map((image: ProductImage | undefined) => {
    return (
      <div
        key={image?.id}
        className="relative h-36 w-36  overflow-hidden   bg-cover"
        onClick={() => handleClick(image!)}
      >
        <Image
          src={image?.url || ""}
          alt={product?.title || ""}
          className="object-cover"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
    );
  });

  useEffect(() => {
    data?.product && setProduct(data?.product);
    data?.product &&
      data?.product?.thumbnail &&
      setMainImage(data?.product?.thumbnail);
    data?.product && data?.product?.images && setImages(data?.product?.images);
    data?.product?.images && console.log("images:", images);
    setAllImages([data?.product?.thumbnail].concat(data?.product?.images));
  }, [data?.product, setImages, data?.product?.images, setAllImages]);
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="w-full aspect-square overflow-hidden relative">
            <Image
              alt={product?.title || ""}
              src={mainImage?.url || ""}
              fill
              className=" object-cover"
            />
          </div>
          <div className="w-full h-40 overflow-hidden relative overflow-x-scroll scroll-m-8 ::-webkit-appearancee:none">
            <div className=" absolute top-0 left-0  w-auto flex flex-stretch gap-0 flex-nowrap">
              {renderAllImages}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            {product?.categoryId?.name && (
              <Link href={`/categories/${product?.categoryId?.name}`}>
                {capitalize(product?.categoryId?.name)}
              </Link>
            )}
            {product?.categoryId && product?.collectionId && <>|</>}
            {product?.collectionId?.name && (
              <Link href={`/collections/${product?.collectionId?.name}`}>
                {capitalize(product?.collectionId?.name)}
              </Link>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-medium">
            {product?.title && capitalize(product?.title)}
          </h1>
          <p className="text-md font-normal">{product?.description}</p>
          <ul className=" list-item">
            {product?.bulletpoints &&
              product?.bulletpoints?.map((item) => {
                return <li key={item}>{item}</li>;
              })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
