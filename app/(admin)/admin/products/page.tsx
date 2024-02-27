"use client";
import ProductTable from "@/app/components/UI/adminTables/productTable";
import { Product, ProductExtended } from "@/app/lib/types";
import React, { useEffect, useState } from "react";

const swrfetcher = (url: string) => fetch(url).then((res) => res.json());
export default function ProductsPage() {
  // const { data, error } = useSWR("/api/products", swrfetcher);
  const [products, setProducts] = useState<ProductExtended[]>();

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => await res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    <div>
      <ProductTable
        products={products || []}
        currentPageNo={1}
        hasMore={false}
      />
    </div>
  );
}
