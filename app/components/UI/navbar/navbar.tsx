'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo-black.svg';
import NavItem from './navItem';
import { DropdownItemProps, NavbarProps } from '@/app/lib/types';
import { IconShoppingBag } from '@tabler/icons-react';
import Button from '../button/button';
import CartItem from './cartItem';
import MobileNav from './mobileNav';
import { catalogDropdown } from './dropdownItemLists';
import useAuth from '@/app/hooks/useAuth';
import ProfileInfo from './profileInfo';

export default function Navbar({ cartItemsCount }: NavbarProps) {
  const { loading, loggedIn, isAdmin } = useAuth();
  return (
    <>
      <div className="hidden w-full lg:flex justify-center py-3 bg-white z-[100] fixed top-0 left-0 border-b border-stone-300">
        <div className="w-full flex justify-between items-center max-w-[--container-max-width] px-5 gap-3">
          <Link href="/" className="min-w-[200px]">
            <Image src={Logo} width="120" height="30" alt="logo" />
          </Link>
          <div className="flex items-center justify-center gap-8">
            <NavItem
              link="/catalog"
              active={false}
              dropdown={true}
              dropdownItems={catalogDropdown}
              // setOpen={setOpen}
            >
              Catalog
            </NavItem>
            <NavItem link="/sale" active={false} dropdown={false}>
              Sale
            </NavItem>
          </div>
          <div className="flex items-center justify-end gap-4 min-w-[200px]">
            <CartItem dark={true} cartItemsCount={cartItemsCount} />
            {loading ? (
              <div className="rounded-full w-8 h-8 border-[2px] border-r-transparent border-amber-800 animate-spin "></div>
            ) : loggedIn ? (
              <ProfileInfo isAdmin={isAdmin} />
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  size="xsmall"
                  mode="neutral"
                  button={false}
                  link="/auth/login"
                >
                  Login
                </Button>
                <Button
                  size="xsmall"
                  mode="neutral"
                  button={false}
                  link="/auth/register"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileNav cartItemsCount={cartItemsCount} />
    </>
  );
}
