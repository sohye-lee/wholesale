import ProductTable from '@/app/components/UI/adminTables/productTable';
import { Product } from '@/app/lib/types';
import React from 'react';

const products: Product[] = [
  {
    _id: '1',
    title: 'Hero Bracelet',
    thumbnail: '',
    description: 'Magnetic bracelet',
    price: {
      base: 129,
      discounted: 99,
      sale: 30,
    },
    categoryId: '123',
    quantity: 100,
  },
  {
    _id: '2',
    title: 'Hera Bracelet',
    thumbnail: '',
    description: 'Magnetic bracelet',
    price: {
      base: 129,
      discounted: 99,
      sale: 30,
    },
    categoryId: '123',
    quantity: 100,
  },
  {
    _id: '3',
    title: 'Onyx Bracelet',
    thumbnail: '',
    description: 'Magnetic bracelet',
    price: {
      base: 129,
      discounted: 99,
      sale: 30,
    },
    categoryId: '123',
    quantity: 100,
  },
];

export default function ProductsPage() {
  return (
    <div>
      <ProductTable products={products} currentPageNo={1} hasMore={false} />
    </div>
  );
}
