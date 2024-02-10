'use client';
import { NavbarProps } from '@/app/lib/types';
import { IconMenu, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '@/public/logo-white.svg';
import CartItem from './cartItem';
import NavItem from './navItem';
import { catalogDropdown } from './dropdownItemLists';

export default function MobileNav({ cartItemsCount }: NavbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex lg:hidden w-full fixed top-0 left-0 py-2 bg-stone-800 justify-center px-5 z-50">
        <div className="flex justify-between items-center w-full">
          <button onClick={() => setOpen(true)}>
            <IconMenu className="text-white" width={20} />
          </button>
          <Link href="/">
            <Image alt="logo" width="120" height="30" src={Logo} />
          </Link>
          <CartItem dark={false} cartItemsCount={cartItemsCount} />
        </div>
      </div>

      <div
        className={`h-screen bg-white py-4 px-5 fixed z-[100] top-0 right-0 min-w-[300px] translate-x-[100%] transition-transform ${
          open && 'translate-x-0'
        }`}
      >
        <div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-100"
          >
            <IconX width={16} className="text-stone-700" />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <NavItem
            link="/catalog"
            active={false}
            dropdown={true}
            dropdownItems={catalogDropdown}
          >
            Catalog
          </NavItem>
          <NavItem link="/sale" active={false} dropdown={false}>
            Sale
          </NavItem>
          <hr className="mt-8" />
        </div>
      </div>
    </>
  );
}
