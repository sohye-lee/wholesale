"use client";
import React from "react";
import Logo from "@/public/logo-white.svg";
import Link from "next/link";
import Image from "next/image";
import {
  IconHome2,
  IconDashboard,
  IconPackage,
  IconUser,
  IconStars,
  IconTag,
  IconShoppingBag,
  IconFolder,
  IconLogout,
} from "@tabler/icons-react";
import SignOutButton from "@components/forms/signoutButton";
import AdminMobileNav from "./adminMobileNav";
import useAuth from "@/app/hooks/useAuth";
import Button from "../button/button";

export default function AdminSidebar() {
  const { loggedIn } = useAuth();
  return (
    <>
      <div className="fixed z-50 left-0 top-0 min-w-[200px] hidden lg:flex flex-col justify-between gap-3 h-screen bg-stone-800">
        <div className="w-full px-4 py-8 flex flex-col gap-3">
          <Link href="/admin">
            <Image alt="logo" src={Logo} width={100} height={30} />
          </Link>
          <Link
            href="/"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400 text-sm uppercase mt-8"
          >
            <IconDashboard width={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconPackage width={20} />
            <span>Products</span>
          </Link>
          <Link
            href="/admin/collections"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconFolder width={20} />
            <span>Collections</span>
          </Link>
          <Link
            href="/admin/sales"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconTag width={20} />
            <span>Sales</span>
          </Link>
          <Link
            href="/admin/featured"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconStars width={20} />
            <span>Featured</span>
          </Link>
          <Link
            href="/admin/orders"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconShoppingBag width={20} />
            <span>Orders</span>
          </Link>
          <Link
            href="/admin/users"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconUser width={20} />
            <span>Users</span>
          </Link>
        </div>
        <div className="border-t border-stone-50 px-4 py-4 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full flex items-center gap-3 text-white hover:text-amber-400  text-sm uppercase"
          >
            <IconHome2 width={20} />
            <span>Go Home</span>
          </Link>
          {loggedIn ? (
            <SignOutButton addClass="flex items-center gap-3 text-white hover:text-amber-400 uppercase text-sm">
              <IconLogout width={20} />
              <span>Logout</span>
            </SignOutButton>
          ) : (
            <div className="flex items-center gap-2">
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

      <AdminMobileNav />
    </>
  );
}
