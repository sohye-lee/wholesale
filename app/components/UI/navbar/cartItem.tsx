import { IconShoppingBag } from '@tabler/icons-react';
import React from 'react';

interface CartItemProps {
  cartItemsCount: number;
  dark: boolean;
}
export default function CartItem({ cartItemsCount, dark }: CartItemProps) {
  return (
    <div
      className={`relative w-10 h-10 rounded-full border ${
        dark ? ' bg-stone-800' : 'bg-white'
      }  flex items-center justify-center`}
    >
      <IconShoppingBag className={` ${dark && 'text-white'}`} width={20} />
      <div
        className={`absolute -right-2 -bottom-1 text-[10px] rounded-full bg-white border border-stone-800 ${
          !dark && 'bg-amber-400'
        } flex items-center justify-center  w-5 h-5 `}
      >
        {cartItemsCount}
      </div>
    </div>
  );
}
