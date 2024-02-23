"use client";
import { ProfileInfoProps } from "@/app/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { profileDropdown } from "./dropdownItemLists";
import Link from "next/link";
import SignOutButton from "../../forms/authForms/signoutButton";
import { IconLogout2 } from "@tabler/icons-react";

export default function ProfileInfo({
  username,
  avatar,
  isAdmin,
}: ProfileInfoProps) {
  const [open, setOpen] = useState(false);
  const profileAvatar = useRef<HTMLDivElement>(null);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
      throw new Error(`Node expected`);
    }
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      assertIsNode(e.target);
      if (open && !profileAvatar.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
  }, [open]);

  return (
    <div className="relative">
      <div
        onClick={handleOpen}
        ref={profileAvatar}
        className={`w-10 h-10 rounded-full cursor-pointer ${
          !avatar
            ? "bg-gradient-to-r from-teal-600 to-amber-700"
            : "bg-cover bg-no-repeat bg-[url(" + avatar + ")]"
        }`}
      ></div>
      {open && (
        <div className="absolute top-12 right-0 py-2  bg-white border border-gray-200">
          {profileDropdown.map((profile) => {
            return (
              <Link
                href={profile.link}
                key={profile.text}
                onClick={() => setOpen(false)}
                className={`${
                  !isAdmin && profile.isAdmin ? "hidden" : "flex"
                } items-center gap-2 py-2 px-5 border-b text-stone-800 border-gray-100 last:border-none hover:bg-stone-100 hover:text-amber-800`}
              >
                {profile.dropdownIcon && <profile.dropdownIcon width={16} />}
                <span className="text-sm  pr-1">{profile.text}</span>
              </Link>
            );
          })}
          <SignOutButton>
            <div
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 py-2 px-5 border-b text-stone-800 border-gray-100 last:border-none hover:bg-stone-100 hover:text-amber-800`}
            >
              <IconLogout2 width={16} />
              <span className="text-sm  pr-1">Logout</span>
            </div>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
