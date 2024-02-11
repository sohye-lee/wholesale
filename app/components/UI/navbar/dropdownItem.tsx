import { DropdownItemProps } from '@/app/lib/types';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@tabler/icons-react';

export default function DropdownItem({
  link,
  text,
  dropdownIcon,
}: DropdownItemProps) {
  return (
    <Link
      href={link}
      className="w-full py-2 px-3 text-xs text-gray-700 hover:bg-stone-100 hover:text-amber-800 flex items-center"
    >
      {text}
    </Link>
  );
}
