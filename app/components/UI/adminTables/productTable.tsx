'use client';
import React, { useState } from 'react';
import SearchForm from '@components/forms/searchForm';
import { Product, ProductExtended } from '@/app/lib/types';
import Button from '@components/UI/button/button';
import {
  IconEdit,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductTableProps {
  products: ProductExtended[];
  currentPageNo: number;
  hasMore?: boolean;
  showPageNavigator?: boolean;
}
export default function ProductTable({
  products,
  currentPageNo,
  hasMore,
  showPageNavigator,
}: ProductTableProps) {
  const [pageNo, setPageNo] = useState(currentPageNo);
  const renderProducts =
    products && products.length > 0 ? (
      products.map((product) => {
        return (
          <tr key={product._id}>
            <td>
              <Link
                href={`/products/${product._id}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={product.thumbnail?.url || ''}
                  width="80"
                  height="80"
                  alt={product.title}
                />
                {product.title}
              </Link>
            </td>
            <td>{product.price.base}</td>
            <td>{product.price.discounted}</td>
            <td>{product.quantity}</td>
            <td>{product.categoryId?.name}</td>
            <td>{product.collectionId?.name}</td>
            <td>
              <Link href={`/products/${product._id}/update`}>
                <IconEdit width={16} />
              </Link>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={6}>*No product yet.</td>
      </tr>
    );
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium">Products</h1>
        <div className="flex items-stretch gap-3">
          <SearchForm />
          <Button size="small" mode="success" link="/admin/products/new">
            <IconPlus width={16} />
            <span className=" shrink">Add</span>
          </Button>
        </div>
      </div>

      <table className="mt-5 w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>MRP</th>
            <th>Sale Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Colleciton</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{renderProducts}</tbody>
      </table>
      {hasMore && (
        <div className="w-full flex justify-center items-center mt-5 gap-3">
          <button
            onClick={() => setPageNo(pageNo - 1)}
            className="hover:text-amber-600 p-1 hover:bg-gray-100"
          >
            <IconChevronLeft />
          </button>
          {currentPageNo}
          <button
            onClick={() => setPageNo(pageNo + 1)}
            className="hover:text-amber-600 p-1 hover:bg-gray-100"
          >
            <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
