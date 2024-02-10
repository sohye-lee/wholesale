'use client';
import { DropdownItemProps } from '@/app/lib/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DropdownItem from './dropdownItem';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface NavItemProps {
  link: string;
  children: React.ReactNode;
  active: boolean;
  dropdown?: boolean;
  dropdownItems?: DropdownItemProps[];
  addClass?: string;
  ref?: React.RefObject<HTMLButtonElement>;
  [key: string]: any;
}
export default function NavItem({
  link,
  active,
  children,
  dropdown,
  dropdownItems,
  addClass,
  ref,
}: NavItemProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };
  useEffect(() => {});
  return (
    <div className="relative group">
      <Link
        href={link}
        className={`relative uppercase py-5 text-sm  ${addClass}`}
      >
        {children}
        <div
          className={`absolute bottom-3 left-0 w-full h-[2px] bg-stone-700 scale-x-0 group-hover:scale-x-100 transition-all ${
            active && 'scale-x-100'
          }`}
        ></div>
        <button
          className={`absolute -right-6 top-[50%] -translate-y-[50%] lg:hidden ${
            !dropdownItems && 'hidden'
          } `}
          onClick={handleDropdown}
          ref={ref}
        >
          {dropdownOpen ? (
            <IconChevronUp width={16} />
          ) : (
            <IconChevronDown width={16} />
          )}
        </button>
      </Link>
      {dropdown && (
        <>
          <div className="absolute top-[160%] bg-white left-0 p-3 pr-4 hidden flex-col shadow-stone-300 border border-stone-200 lg:group-hover:flex ">
            {dropdownItems &&
              dropdownItems.length > 0 &&
              dropdownItems.map((item) => {
                return (
                  <DropdownItem
                    key={item.link}
                    link={item.link}
                    text={item.text}
                  />
                );
              })}
          </div>
          <div
            className={`lg:hidden transition-all flex-col ${
              dropdownOpen ? 'flex py-3' : 'hidden'
            }`}
          >
            {dropdownItems &&
              dropdownItems.length > 0 &&
              dropdownItems.map((item) => {
                return (
                  <DropdownItem
                    key={item.link}
                    link={item.link}
                    text={item.text}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
