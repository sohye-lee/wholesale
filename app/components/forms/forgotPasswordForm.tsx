"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./input";
import Button from "../UI/button/page";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, redirect } from "next/navigation";
import useRequest from "@/app/hooks/useRequest";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const session = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ mode: "onBlur" });
  const [sendLink, { data, error, loading }] = useRequest(
    "/api/users/forgot-password",
    "POST"
  );

  const onValid = async (validForm: ForgotPasswordForm) => {
    sendLink(validForm);
  };

  useEffect(() => {
    session?.data?.user && redirect("/");
  }, [session?.data?.user]);
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white"
    >
      <h1 className="text-xl font-medium uppercase text-center mb-3">
        Forgot Your Password?
      </h1>

      <Input
        placeholder="email"
        name="email"
        register={register("email", {
          required: "You must write your email address.",
        })}
        type="email"
        required={true}
        errorMessage={errors.email?.message || null}
      />

      <Button mode="CTA" addClass="w-full py-3" button={true} size="medium">
        Send Link
      </Button>
      <Button
        mode="neutral"
        addClass="w-full py-3"
        button={false}
        link="/auth/login"
        size="medium"
      >
        Login
      </Button>
      <Button
        mode="neutral"
        addClass="w-full py-3"
        button={false}
        link="/auth/register"
        size="medium"
      >
        Sign Up
      </Button>
      <div className="text-center text-xs text-stone-700 hover:text-amber-800 mt-3">
        <Link href="/">Go Home</Link>
      </div>
    </form>
  );
}
