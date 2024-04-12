"use client";
import Container from "@/app/components/UI/container/container";
import useSWR from "swr";
import { Product } from "../lib/types";
import Link from "next/link";

const swrfetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(`/api/products/`, swrfetcher);

  const renderProducts =
    data?.products &&
    data?.products?.length > 0 &&
    data?.products.map((product: Product) => {
      return (
        <Link
          href={`/products/${product._id}`}
          key={product._id}
          className="flex flex-col gap-2 pb-4"
        >
          <div className="aspect-square w-full overflow-hidden bg-gray-100 block">
            <img
              src={product.thumbnail?.url ?? ""}
              alt="thumbnail"
              className=" object-cover min-w-full min-h-full"
            />
          </div>
          <h3 className="leading-[1.2] text-lg">{product.title}</h3>
        </Link>
      );
    });

  return (
    <Container bgColor=" ">
      <div className="w-full  h-[300px] grid md:grid-cols-3 lg:grid-cols-4 md:gap-2 lg:gap-3">
        {renderProducts}
      </div>
    </Container>
  );
}
