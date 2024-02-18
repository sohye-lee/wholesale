'use client';
import { NavbarProps } from '@/app/lib/types';
import { IconLogout2, IconMenu, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/public/logo-white.svg';
import CartItem from './cartItem';
import NavItem from './navItem';
import { catalogDropdown, profileDropdown } from './dropdownItemLists';
import Button from '../button/button';
import useAuth from '@/app/hooks/useAuth';
import SignOutButton from '../../forms/signoutButton';

export default function MobileNav({ cartItemsCount }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { isAdmin, loggedIn } = useAuth();
  const mobileMenuBg = useRef<HTMLDivElement>(null);

  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`);
    }
  }
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      assertIsNode(e.target);
      if (open && mobileMenuBg.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener('click', handleClick);

    const onResize = () => {
      window.innerWidth >= 1024 && setOpen(false);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click', handleClick);
    };
  }, [open]);
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
      {open && (
        <div
          ref={mobileMenuBg}
          className="fixed w-screen h-screen top-0 left-0 bg-black z-[99] opacity-25"
        ></div>
      )}
      <div
        className={`h-screen bg-white py-4 px-5 fixed z-[100] top-0 right-0 min-w-[300px]  transition-transform ${
          open ? 'translate-x-0' : 'translate-x-[100%]'
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
        <div className="flex flex-col   mt-12">
          <NavItem
            link="/catalog"
            active={false}
            dropdown={true}
            dropdownItems={catalogDropdown}
            setOpen={setOpen}
          >
            Catalog
          </NavItem>
          <NavItem
            link="/sale"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            Sale
          </NavItem>
          <hr className="my-3" />
          <div className="flex items-center">
            {loggedIn ? (
              <div className="   ">
                {profileDropdown.map((profile) => {
                  return (
                    <NavItem
                      key={profile.link}
                      link={profile.link}
                      active={false}
                      dropdown={false}
                      setOpen={setOpen}
                      addClass={!isAdmin && profile.isAdmin ? 'hidden' : 'flex'}
                    >
                      {profile.dropdownIcon && (
                        <profile.dropdownIcon width={16} />
                      )}
                      {profile.text}
                    </NavItem>
                  );
                })}
                <SignOutButton>
                  <NavItem
                    link="#"
                    active={false}
                    dropdown={false}
                    setOpen={setOpen}
                  >
                    <IconLogout2 width={16} />
                    Logout
                  </NavItem>
                </SignOutButton>
                {/* {profileDropdown.map((profile) => {
                  return (
                    <Link
                      href={profile.link}
                      key={profile.text}
                      onClick={() => setOpen(false)}
                      className={`${
                        !isAdmin && profile.isAdmin ? 'hidden' : 'flex'
                      } items-center gap-2 py-2 px-5 border-b text-stone-800 border-gray-100 last:border-none hover:bg-stone-100 hover:text-amber-800`}
                    >
                      {profile.dropdownIcon && (
                        <profile.dropdownIcon width={16} />
                      )}
                      <span className="text-sm  pr-1">{profile.text}</span>
                    </Link>
                  );
                })} */}
              </div>
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
    </>
  );
}
