import { DropdownItemProps } from '@/app/lib/types';
import Link from 'next/link';
import React from 'react';

export default function DropdownItem({ link, text }: DropdownItemProps) {
  return (
    <Link
      href={link}
      className="w-full py-2 px-3 text-xs text-gray-700 hover:bg-stone-100 hover:text-amber-800"
    >
      {text}
    </Link>
  );
}
