'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from '../UI/button/page';
import Link from 'next/link';

interface SignupFormProps {
  name: string;
  email: string;
  password: string;
}
export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormProps>();
  return (
    <form className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white">
      <h1 className="text-xl font-medium uppercase text-center mb-3">
        Create New Account
      </h1>
      <Input
        placeholder="name"
        name="name"
        register={register('name')}
        type="text"
        required={true}
        errorMessage={errors.name?.message || null}
      />
      <Input
        placeholder="email"
        name="email"
        register={register('email')}
        type="email"
        required={true}
        errorMessage={errors.email?.message || null}
      />
      <Input
        placeholder="password"
        name="password"
        register={register('password')}
        type="password"
        required={true}
        errorMessage={errors.password?.message || null}
      />
      <Button mode="CTA" addClass="w-full py-3" button={true} size="medium">
        Create
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
      <div className="text-center text-xs text-stone-700 hover:text-amber-800">
        <Link href="/forgotpassword">Forgot Password</Link>
      </div>
    </form>
  );
}
