"use client";
import Button from "@/app/components/UI/button/button";
import Container from "@/app/components/UI/container/container";
import { capitalize, capitalizeWord } from "@/app/lib/functions";
import { ProductExtended, ProductImage } from "@/app/lib/types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Skeleton } from "@nextui-org/react";
import ProductImageLoading from "@/app/components/loading/productImages";
import ProductInfoLoading from "@/app/components/loading/productInfoLoading";

const swrfetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage(props: any) {
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `/api/products/${props.params._id}`,
    swrfetcher
  );
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
        className="relative aspect-square overflow-hidden "
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
      {session?.user?.role == "admin" && (
        <div className="inline-block mb-3">
          <Button
            size="xsmall"
            mode="neutral"
            link={`/admin/products/${product?._id}/update`}
          >
            <IconPencil width={16} className="mr-2" /> Edit This Product
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {!data && !error ? (
          <ProductImageLoading />
        ) : (
          <div>
            <div className="w-full aspect-square overflow-hidden relative">
              <Image
                alt={product?.title || ""}
                src={mainImage?.url || ""}
                fill
                className=" object-cover"
              />
            </div>
            <div className="w-full grid grid-cols-4">{renderAllImages}</div>
          </div>
        )}

        {!data && !error ? (
          <ProductInfoLoading />
        ) : (
          <div className="flex flex-col gap-3">
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
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="px-2 text-amber-600 text-lg font-medium border-2 border-amber-600 rounded">
                  ${product?.price?.discounted}
                </div>
                <span className="line-through font-medium">
                  ${product?.price?.base}
                </span>
                <span>{(product?.sale || 0) * 100}%</span>
              </div>
            </div>
            <p className="text-md">{product?.description}</p>
            <ul className="list-disc pl-5">
              {product?.bulletpoints &&
                product?.bulletpoints?.map((item) => {
                  return (
                    <li key={item} className="font-light">
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
