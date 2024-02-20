"use client";
import useRequest from "@/app/hooks/useRequest";
import useAuth from "@app/hooks/useAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EmailVerificationAlert() {
  const { profile } = useAuth();
  console.log("auth profile: ", profile?._id);
  const [message, setMessage] = useState<string>();

  const requestLink = async () => {
    if (!profile) return;

    const data = await fetch(`/api/users/verify?userId=${profile?._id}`).then(
      async (res) => await res.json()
    );

    if (!data?.ok) return;
    toast.success(data?.message);
    setMessage(data?.message);
  };
  useEffect(() => {}, [profile]);
  return (
    <div className="w-full mb-3 d p-4 bg-gray-200">
      {message ? (
        <p className="w-full text-center text-sm text-amber-700 font-medium">
          {message}
        </p>
      ) : (
        <p className="w-full text-center text-sm">
          It seems like you did not verify your email. Get the verification link{" "}
          <button onClick={requestLink} className="font-medium undeline">
            here
          </button>
        </p>
      )}
    </div>
  );
}
