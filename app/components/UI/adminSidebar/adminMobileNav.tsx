'use client';
import {
  IconLogout2,
  IconMenu,
  IconX,
  IconHome2,
  IconDashboard,
  IconPackage,
  IconUser,
  IconStars,
  IconTag,
  IconShoppingBag,
  IconFolder,
  IconLogout,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/public/logo-white.svg';
import NavItem from '@components/UI/navbar/navItem';
// import { catalogDropdown, profileDropdown } from './dropdownItemLists';
import Button from '../button/button';
import useAuth from '@/app/hooks/useAuth';
import SignOutButton from '../../forms/signoutButton';

export default function AdminMobileNav() {
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
        <div className="flex flex-col mt-8">
          <NavItem
            link="/admin/dashboard"
            active={false}
            dropdown={false}
            // dropdownItems={catalogDropdown}
            setOpen={setOpen}
          >
            <IconDashboard width={20} />
            <span>Dashboard</span>
          </NavItem>
          <NavItem
            link="/admin/Products"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconPackage width={20} />
            <span>Products</span>
          </NavItem>
          <NavItem
            link="/admin/collections"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconFolder width={20} />
            <span>Collections</span>
          </NavItem>
          <NavItem
            link="/admin/sales"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconTag width={20} />
            <span>Sales</span>
          </NavItem>
          <NavItem
            link="/admin/featured"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconStars width={20} />
            <span>Featured</span>
          </NavItem>
          <NavItem
            link="/admin/orders"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconShoppingBag width={20} />
            <span>Orders</span>
          </NavItem>
          <NavItem
            link="/admin/users"
            active={false}
            dropdown={false}
            setOpen={setOpen}
          >
            <IconUser width={20} />
            <span>Users</span>
          </NavItem>
          <hr className="my-3" />
          <div className="">
            <div className=" ">
              {loggedIn ? (
                <SignOutButton>
                  <IconLogout2 width={16} />
                  Logout
                </SignOutButton>
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
      </div>
    </>
  );
}
