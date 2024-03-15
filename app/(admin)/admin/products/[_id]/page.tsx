"use client";
import Container from "@/app/components/UI/container/container";
import { ProductExtended } from "@/app/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

interface ProductPagePros {
  [key: string]: any;
}

export default function ProductPage({ product }: ProductPagePros) {
  const path = useSearchParams();
  const _id = path.get("_id");
  const { data } = useSWR(`/api/products/${_id}`);

  useEffect(() => {
    console.log(data);
    console.log(_id);
  }, [data, _id]);
  return (
    <Container>
      <h1 className="text-xl font-medium">{}</h1>
    </Container>
  );
}
